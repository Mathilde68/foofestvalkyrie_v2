
"use strict";

window.addEventListener("DOMContentLoaded", start);

const form = document.querySelector(".newsletter_form");

function start() {

    document.getElementById("sign_up").addEventListener("click", function (event) {
        if (form.checkValidity()) {
            event.preventDefault();
            getInputNewslet();

        } else {
            console.log("Not valid yet");
        }
    });
}


function getInputNewslet() {

    const email = form.elements.mail.value;
    const subType = form.elements.radio.value;
    let subMsg;

    if (subType === "all") {
        subMsg = `From now on you will receive our newsletters on all things Foofestival, 
            in addition to all essential news about ticket sales, camping and other announcements!
            Remember you can always change your subscription type on our site, if you want to receive only essential news!`
    } else {

        subMsg = `From now on you will receive our newsletter with most essential news, such as ticket sales, camping and other announcements. 
            Remember you can always change your subscription type on our site, if you want more news on all things Foofestival!`
    }

    sendNewslet(subMsg, email);

}

function sendNewslet(subMsg, email) {

    const payload = {
        service_id: 'service_ngppnvc',
        template_id: 'template_9tzfar7',
        user_id: 'dgCgRYkZrhDwvJ2pA',
        template_params: {
            'subMsg': subMsg,
            'to_user': email

        }
    };
    console.log(payload);


    fetch(`https://api.emailjs.com/api/v1.0/email/send`, {

        method: "post",

        body: JSON.stringify(payload),

        headers: {

            Accept: "application/json",

            "Content-Type": "application/json",

        },

    })

        .then((res) => res.json())
        .then((d) => {
            console.log(d);

        });
}

