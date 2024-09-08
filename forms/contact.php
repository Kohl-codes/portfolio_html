<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $subject = htmlspecialchars($_POST['subject']);
    $message = htmlspecialchars($_POST['message']);

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email format";
        exit();
    }

    // Set up email parameters
    $to = "mikaorador@gmail.com";
    $headers = "From: " . $email . "\r\n" .
               "Reply-To: " . $email . "\r\n" .
               "X-Mailer: PHP/" . phpversion();
    $fullMessage = "You have received a new message from $name.\n\n" .
                   "Subject: $subject\n\n" .
                   "Message:\n$message";

    // Send email
    if (mail($to, $subject, $fullMessage, $headers)) {
        echo "Your message has been sent. Thank you!";
    } else {
        echo "Failed to send your message. Please try again later.";
    }
}
?>
