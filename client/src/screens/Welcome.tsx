import React from 'react';

const Welcome: React.FC = () => {
	return (
		<section>
			<h2>Welcome</h2>
			<div className="subsection left">
				<p>Welcome to OpenDrop! Let me explain what this website is.</p>
				<p>
					This website allows you to copy files over the network (LAN if both devices are on the same local
					network and support WebRTC, otherwise the traffic goes through a TURN relay). Originally I've
					created this project to avoid logging into my e-mail on computers I don't own or having to type long
					URLs by hand. I hope it is as useful for you as it is for me. :)
				</p>
				<p>
					You can start a file transfer in a few easy steps:
					<ol>
						<li>Open this website on one device (you're here right now!)</li>
						<li>Scan the QR code or open the URL from the "Invite" section on another device.</li>
						<li>
							Drag and drop your files onto a tile (any tile that isn't marked as "You", you can also
							click on a tile to open a file selection dialog).
						</li>
						<li>Accept the transfer on another device.</li>
					</ol>
				</p>
				<p>
					Clicking the "Continue" button below this notice will save data (welcomed = '1') into your browser's
					local storage. This data will be used to avoid showing you this notice in future.
				</p>
			</div>
		</section>
	);
};

export default Welcome;
