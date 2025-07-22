import { Player } from '@lottiefiles/react-lottie-player';

export default function Spinner() {
  return (
    <div className="flex justify-center items-center min-h-screen dark:bg-dark-background">
      <Player
        autoplay
        loop={true}
        speed={3}
        src="https://assets7.lottiefiles.com/packages/lf20_usmfx6bp.json"
        style={{ height: '300px', width: '300px' }}
      />
    </div>
  );
}