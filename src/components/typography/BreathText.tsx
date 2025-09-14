type BreathTextProps = {
  children: React.ReactNode;
  color?: string;
  duration?: string;
};

const BreathText = ({ children, color = "#39FF14", duration = "5s" }: BreathTextProps) => (
  <div style={{
    animation: `breath ${duration} infinite`,
    color, // bright neon green
    textShadow: `0 0 16px ${color}, 0 0 32px ${color}`
  }}>
    {children}

    <style>
      {`
            @keyframes breath {
              0%, 100% {
              filter: brightness(1);
              text-shadow: 0 0 16px ${color}, 0 0 32px ${color};
              }
              50% {
              filter: brightness(0.8);
              text-shadow: 0 0 32px ${color}, 0 0 64px ${color};
              }
            }
            `}
    </style>
  </div>
);

export default BreathText;