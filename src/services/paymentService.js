const crypto = require("crypto");

const razorpay = require("../config/razorpay");

const Event = require("../models/eventModel");
const Guest = require("../models/guestModel");

const paymentRepo = require("../repositories/paymentRepo");

const AppError = require("../utils/appError");

const createPaymentOrder = async ({
    eventId,
    gender,
}) => {
    /*
     * =========================
     * GET EVENT
     * =========================
     */

    const event = await Event.findById(eventId);

    if (!event) {
        throw new AppError("Event not found", 404);
    }

    /*
     * =========================
     * CHECK EVENT STATUS
     * =========================
     */

    if (!event.active) {
        throw new AppError(
            "Event is not active",
            400
        );
    }

    /*
     * =========================
     * CHECK DEADLINE
     * =========================
     */

    if (new Date() > new Date(event.deadline)) {
        throw new AppError(
            "Registration deadline has passed",
            400
        );
    }

    /*
     * =========================
     * CHECK SEATS
     * =========================
     */

    if (event.registrationCount <= 0) {
        throw new AppError(
            "Event is sold out",
            400
        );
    }

    /*
     * =========================
     * CALCULATE PRICE
     * =========================
     *
     * IMPORTANT:
     * Never trust price coming from frontend.
     */

    let amount;

    switch (gender) {
        case "King":
            amount = event.malePrice;
            break;

        case "Queen":
            amount = event.femalePrice;
            break;

        case "Couple":
            amount = event.twoPeoplePrice;
            break;

        default:
            throw new AppError(
                "Invalid gender",
                400
            );
    }

    /*
     * =========================
     * CREATE RAZORPAY ORDER
     * =========================
     */
    const razorpayOrder =
        await razorpay.orders.create({
            amount: amount * 100,
            currency: "INR",
            receipt: `event_${eventId}_${Date.now()}`,
        });

    /*
     * =========================
     * SAVE PAYMENT
     * =========================
     */
    const payment =
        await paymentRepo.createPayment({
            eventId: event._id,
            amount,
            razorpayOrderId:
                razorpayOrder.id,
            status: "created",
        });

    return {
        orderId: razorpayOrder.id,

        amount,

        currency: "INR",

        key: process.env.RAZORPAY_KEY_ID,

        paymentId: payment._id,
    };
};

const verifyPayment = async ({
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
    guestData,
}) => {

    const payment =
        await paymentRepo.getPaymentByOrderId(
            razorpay_order_id
        );

    if (!payment) {
        throw new AppError(
            "Payment order not found",
            404
        );
    }


    if (payment.status === "paid") {
        throw new AppError(
            "Payment already processed",
            400
        );
    }

    /*
     * =========================
     * VERIFY RAZORPAY SIGNATURE
     * =========================
     */

    const generatedSignature =
        crypto
            .createHmac(
                "sha256",
                process.env.RAZORPAY_KEY_SECRET
            )
            .update(
                `${payment.razorpayOrderId}|${razorpay_payment_id}`
            )
            .digest("hex");

    if (
        generatedSignature !==
        razorpay_signature
    ) {
        throw new AppError(
            "Invalid payment signature",
            400
        );
    }


    const event =
        await Event.findById(
            payment.eventId
        );

    if (!event) {
        throw new AppError(
            "Event not found",
            404
        );
    }

    if (!event.active) {
        throw new AppError(
            "Event is no longer active",
            400
        );
    }

    if (
        new Date() >
        new Date(event.deadline)
    ) {
        throw new AppError(
            "Registration deadline has passed",
            400
        );
    }

    const guest =
        await Guest.create({
            eventId: payment.eventId,

            name: guestData.name,
            age: guestData.age,
            gender: guestData.gender,
            phoneNumber:
                guestData.phoneNumber,
            instaId: guestData.instaId,
            place: guestData.place,
            talent: guestData.talent,
            description:
                guestData.description,

            amount: payment.amount,

            razorpayOrderId:
                payment.razorpayOrderId,

            razorpayPaymentId:
                razorpay_payment_id,

            razorpaySignature:
                razorpay_signature,

            payment: true,

            approve: true,
        });

    await paymentRepo.updatePayment(
        payment._id,
        {
            razorpayPaymentId:
                razorpay_payment_id,

            razorpaySignature:
                razorpay_signature,

            status: "paid",
        }
    );


    return guest;
};


module.exports = {
    createPaymentOrder,
    verifyPayment,
};

