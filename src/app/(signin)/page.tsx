import DotPattern from "../../components/signin/DotPattern";

export default function SignIn() {
  return (
    <div className="flex flex-row w-full h-screen justify-center items-center bg-red-100">

      <div className="bg-green-200 w-1/2 h-full flex flex-col justify-center items-center">
        <div>
          <p className="font-black">Sign in</p>
          <p >Enter your username and password</p>
        </div>
      </div>
      
      <div className="w-1/2 h-full bg-blue-200">
        <DotPattern
          bigSize={16}
          smallSize={8}
          spacing={40}
          color="#0f172a66"
        />
      </div>
    </div>
  );
}
