import Image from 'next/image';
import LoginForm from '@/components/login/LoginForm';
import getTranslation from '../../../i18n';
import { DropdownLanguage } from '@/components/DropdownLanguage';

export default async function Login() {
  const { t } = await getTranslation();

  return (
    <div className="relative flex w-full h-screen justify-center items-center">
      <div className="w-full max-w-[650px] flex flex-col px-6 -translate-y-10 transition-all">
        <div className="w-full flex justify-center -my-5">
          <Image
            src="/images/logo-06.png"
            alt="Logo"
            width={1400}
            height={1400}
            className="object-contain"
          />
        </div>

        <div className="w-full flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <p className="font-bold text-3xl text-primary lg:text-4xl transition-all">
              {t('SIGNIN')}
            </p>
            <p className="font-light text-xl lg:text-2xl text-neutral-600 transition-all">
              {t('ENTER_EMAIL_AND_PASSWORD')}
            </p>
          </div>

          <LoginForm />
        </div>
      </div>

      <div className="absolute top-4 end-4">
        <DropdownLanguage />
      </div>
    </div>
  );
}
