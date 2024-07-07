import { Auth } from "@/components/auth/Auth";
import imageLogin from '@/assets/svg/undraw_secu.svg';

export const Login = () => {

    return (
        <div className="flex items-center justify-center p-2 pt-12 sm:pt-16 sm:p-10 gap-2">
            <Auth />
            <img className="hidden lg:block w-[400px] h-[400px]" src={imageLogin} />

        </div>
    )
}