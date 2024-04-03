import Image from "next/image";
import { lusitana } from '@/app/ui/fonts';

export default function bgLogo() {
	return (
		<div
			className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
		>
			<Image
				className=""
				src="/bannerimage.png"
				alt="Next.js Logo"
				width={500}
				height={500}
				priority
			/>
		</div>
	);
}
