import Onboarding from "./Onboarding";

const Wallet = () => {
  const content = [
    {
      title: "Manage Your Contributions!",
      message: `The
            Wallet page helps you track and manage your token contributions to
            various climate initiatives. Make every token count!.`
    },
    {
      title: "Your Tokens, Your Impact!",
      message: `Keep
            an eye on your token balance and see how your contributions are
            helping drive climate action. Every token brings us closer to a
            better world.`,
    },
   
    {
      title: "Support Climate Action!",
      message: `Use the
            Wallet page to manage your tokens and contribute to the causes you
            care about. Your support fuels our mission for a sustainable planet.`,
    },
    {
      title: "Manage Your Contributions!",
      message: `Track
            your token balance, manage contributions to climate initiatives, and
            see how your tokens are driving impactful climate action. Every
            token counts toward a sustainable planet.`,
      view: "mobile",
    },
  ];
  const current = 5;

  return (
    <div>
      <Onboarding
        content={content}
        current={current}
        next={"/onboarding/campaigns"}
        prev={"/onboarding/bot"}
        bot={"waverbotlegs"}
      />
    </div>
  );
};

export default Wallet;
