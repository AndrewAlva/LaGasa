<?php 
	$recipient = "andrew@mandelbrot.mx";
	$subject = "LaGasa.com | New message";
	$name = $_POST['name-input'];
	$email = $_POST['email-input'];
	$message = $_POST['message-textarea'];
	$formcontent="Hey Suze, this is a new email written by a user through lagasa.com official site; this is what they say:\n\nHi, my name is $name, here's my email address: $email\nI have a message for you, $message";
	$mailheader = "From: $email \r\n";
	
	if($subject == false || $name == false || $city == false || $email == false || $message == false){
		$mail_sent = false;
		
		?>

		<script type="text/javascript">
			alert("We can't send the message with blank fields, please fill the fields required.");
			window.location = '/';
		</script>

		<?php
	} else {
		$mail_sent = mail($recipient, $subject, $formcontent, $mailheader) or die("Error!");
		if ($mail_sent == true){ ?>
			<script language="javascript" type="text/javascript">
				alert('Great! Your message was sent successfully.');
				window.location = '/';
			</script>

		<?php 
		} else { 
		?>

			<script type="text/javascript">
				alert('There was an error and the message could not be sent, try again and if the error persists, try to reach us on our social media channels.');
				window.location = '/';
			</script>
		
		<?php 
		} 
	}	
?>