import React, { useState, useCallback } from 'react';
import QrCode from 'qrcode.react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { FaShare, FaCopy } from 'react-icons/fa';

interface QrCodeSectionProps {
	href: string;
}

const shareSupported = !!(navigator as any).share;

const QrCodeSection: React.FC<QrCodeSectionProps> = ({ href }) => {
	const [copied, setCopied] = useState(false);

	const onCopy = useCallback(() => setCopied(true), [setCopied]);
	const onShare = useCallback(() => {
		(navigator as any).share({
			title: 'OpenDrop - transfer files',
			url: href,
		});
	}, [href]);

	return (
		<div>
			<h2>Connect</h2>
			<div className="qrcode subsection">
				<div className="info">
					<p>To start transferring files, scan the QR code or open the URL on another device.</p>
					<div>
						<pre>{href}</pre>
						<div className="buttons">
							<CopyToClipboard text={href} onCopy={onCopy}>
								<button>
									<FaCopy /> {copied ? 'Copied' : 'Copy'}
								</button>
							</CopyToClipboard>
							{shareSupported && (
								<button onClick={onShare}>
									<FaShare /> Share
								</button>
							)}
						</div>
					</div>
				</div>
				<div>
					<QrCode value={href} />
				</div>
			</div>
		</div>
	);
};

export default QrCodeSection;
