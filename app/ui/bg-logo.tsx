import Image from "next/image";
import { lusitana } from '@/app/ui/fonts';

export default function AcmeLogo() {
	return (
		<div
			className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
		>
			<Image
				className=""
				src="/bannerImage.jpg"
				alt="Next.js Logo"
				width={400}
				height={400}
				priority
			/>
		</div>
	);
}
