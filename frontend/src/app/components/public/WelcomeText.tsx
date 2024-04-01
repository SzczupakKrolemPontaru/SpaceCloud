import styles from '../../../../styles/Auth.module.css';

interface WelcomeTextProps {
  text: string;
}

export default function WelcomeText({ text }: WelcomeTextProps) {
  return (
    <div id={styles.welcomeDiv}>
      <p id={styles.pHello}>Hello!</p>
      <p id={styles.pLogIn}>{text}</p>
    </div>
  );
}
