
export const verificationEmailTemplate = (url) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta name="color-scheme" content="light">
            <title>Verify your Flavoriz account</title>
        </head>

        <body style="
            margin: 0;
            padding: 0;
            background-color: #f6f7f8;
            font-family: Arial, Helvetica, sans-serif;
            color: #17191c;
        ">

            <!-- Preheader -->
            <div style="
                display: none;
                max-height: 0;
                overflow: hidden;
                opacity: 0;
            ">
                Welcome to Flavoriz! Verify your email to get started.
            </div>

            <table
                role="presentation"
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="background-color: #f6f7f8;"
            >
                <tr>
                    <td align="center" style="padding: 45px 15px;">

                        <!-- Email Card -->
                        <table
                            role="presentation"
                            width="600"
                            cellpadding="0"
                            cellspacing="0"
                            border="0"
                            style="
                                width: 100%;
                                max-width: 600px;
                                background-color: #ffffff;
                                border-radius: 14px;
                                overflow: hidden;
                            "
                        >

                            <!-- Brand Accent -->
                            <tr>
                                <td style="
                                    height: 6px;
                                    background-color: #f5a10b;
                                    font-size: 0;
                                    line-height: 0;
                                ">&nbsp;</td>
                            </tr>

                            <!-- Brand -->
                            <tr>
                                <td style="padding: 35px 45px 20px;">

                                    <div style="
                                        font-size: 27px;
                                        font-weight: 800;
                                        letter-spacing: -1px;
                                        color: #17191c;
                                    ">
                                        Flavoriz<span style="color: #f5a10b;">.</span>
                                    </div>

                                    <div style="
                                        margin-top: 7px;
                                        font-size: 11px;
                                        font-weight: 600;
                                        letter-spacing: 2px;
                                        color: #9299a2;
                                        text-transform: uppercase;
                                    ">
                                        A little taste of inspiration
                                    </div>

                                </td>
                            </tr>

                            <!-- Main Content -->
                            <tr>
                                <td style="padding: 25px 45px 45px;">

                                    <div style="
                                        display: inline-block;
                                        padding: 7px 12px;
                                        background-color: #fff3d8;
                                        color: #b87500;
                                        border-radius: 30px;
                                        font-size: 11px;
                                        font-weight: 700;
                                        letter-spacing: 1px;
                                    ">
                                        EMAIL VERIFICATION
                                    </div>

                                    <h1 style="
                                        margin: 24px 0 15px;
                                        font-family: Georgia, 'Times New Roman', serif;
                                        font-size: 34px;
                                        line-height: 1.25;
                                        font-weight: 700;
                                        color: #17191c;
                                    ">
                                        Welcome to<br>
                                        Flavoriz!
                                    </h1>

                                    <p style="
                                        margin: 0 0 15px;
                                        font-size: 15px;
                                        line-height: 1.8;
                                        color: #555e68;
                                    ">
                                        We're excited to have you here!
                                        Thank you for joining our community.
                                    </p>

                                    <p style="
                                        margin: 0 0 30px;
                                        font-size: 15px;
                                        line-height: 1.8;
                                        color: #555e68;
                                    ">
                                        Before you get started, please confirm
                                        your email address by clicking the
                                        button below.
                                    </p>

                                    <!-- CTA Button -->
                                    <table
                                        role="presentation"
                                        cellpadding="0"
                                        cellspacing="0"
                                        border="0"
                                    >
                                        <tr>
                                            <td
                                                align="center"
                                                bgcolor="#f5a10b"
                                                style="border-radius: 8px;"
                                            >
                                                <a
                                                    href="${url}"
                                                    target="_blank"
                                                    style="
                                                        display: inline-block;
                                                        padding: 16px 32px;
                                                        color: #17191c;
                                                        font-size: 15px;
                                                        font-weight: 700;
                                                        text-decoration: none;
                                                        border-radius: 8px;
                                                    "
                                                >
                                                    Verify My Email &rarr;
                                                </a>
                                            </td>
                                        </tr>
                                    </table>

                                    <p style="
                                        margin: 28px 0 0;
                                        font-size: 13px;
                                        line-height: 1.7;
                                        color: #7b8490;
                                    ">
                                        This verification link will expire
                                        in <strong style="color: #17191c;">
                                        24 hours</strong>.
                                    </p>

                                    <div style="
                                        margin-top: 30px;
                                        padding: 18px;
                                        background-color: #fffaf0;
                                        border: 1px solid #f5e8cd;
                                        border-radius: 8px;
                                    ">
                                        <p style="
                                            margin: 0;
                                            font-size: 12px;
                                            line-height: 1.7;
                                            color: #69717b;
                                        ">
                                            <strong style="color: #17191c;">
                                                Didn't create an account?
                                            </strong>
                                            You can safely ignore this email.
                                            No action is required.
                                        </p>
                                    </div>

                                    <p style="
                                        margin: 30px 0 0;
                                        font-size: 13px;
                                        line-height: 1.7;
                                        color: #69717b;
                                    ">
                                        Having trouble with the button?
                                        Copy and paste this link into your browser:
                                    </p>

                                    <p style="
                                        margin: 10px 0 0;
                                        font-size: 12px;
                                        line-height: 1.7;
                                        word-break: break-all;
                                    ">
                                        <a
                                            href="${url}"
                                            style="color: #b87500;"
                                        >
                                            ${url}
                                        </a>
                                    </p>

                                </td>
                            </tr>

                            <!-- Footer -->
                            <tr>
                                <td style="
                                    padding: 25px 45px;
                                    background-color: #fafafa;
                                    border-top: 1px solid #eeeeee;
                                ">

                                    <p style="
                                        margin: 0 0 8px;
                                        font-size: 13px;
                                        font-weight: 700;
                                        color: #17191c;
                                    ">
                                        Flavoriz.
                                    </p>

                                    <p style="
                                        margin: 0;
                                        font-size: 12px;
                                        line-height: 1.7;
                                        color: #9299a2;
                                    ">
                                        Made with care for food lovers.
                                        <br>
                                        &copy; ${new Date().getFullYear()} Flavoriz.
                                        All rights reserved.
                                    </p>

                                </td>
                            </tr>

                        </table>

                    </td>
                </tr>
            </table>

        </body>
        </html>
    `;
};
