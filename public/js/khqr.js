document.addEventListener("DOMContentLoaded", function () {
    const KHQR = typeof BakongKHQR !== 'undefined' ? BakongKHQR : null;

    if (KHQR) {
        const data = KHQR.khqrData;
        const info = KHQR.IndividualInfo;

        const optionalData = {
            currency: data.currency.usd,
            amount: 100.5,
            mobileNumber: "85512233455",
            storeLabel: "Coffee Shop",
            terminalLabel: "Cashier_1",
            purposeOfTransaction: "oversea",
            languagePreference: "km",
            merchantNameAlternateLanguage: "ចន ស្មីន",
            merchantCityAlternateLanguage: "សៀមរាប",
            upiMerchantAccount: "0001034400010344ABCDEFGHJIKLMNO"
        };

        const individualInfo = new info("sokha_tim@aclb", "Sokha Tim", "PHNOM PENH", optionalData);
        const khqrInstance = new KHQR.BakongKHQR();
        const individual = khqrInstance.generateIndividual(individualInfo);

        // Function to display QR code in the modal
        const displayQRCode = () => {
            if (individual && individual.data && individual.data.qr) {
                const qrCodeCanvas = document.getElementById("qrCodeCanvas");

                // Generate the QR code onto the canvas
                QRCode.toCanvas(qrCodeCanvas, individual.data.qr, function (error) {
                    if (error) console.error(error);
                });

                // Show the modal
                const qrCodeModal = new bootstrap.Modal(document.getElementById("qrCodeModal"));
                qrCodeModal.show();
            } else {
                console.error("QR code data is not available.");
            }
        };

        // Attach event listeners for the Checkout button
        const checkoutButton = document.getElementById("checkout");
        if (checkoutButton) {
            checkoutButton.addEventListener("click", displayQRCode);
        }

    } else {
        console.error("BakongKHQR or its components are not loaded or defined.");
    }
});
