import styles from '../../../../styles/Auth.module.css';

interface AuthFooterProps {
  type: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function AuthFooter({ type, onClick }: AuthFooterProps) {
  return (
    <div id={styles.flex}>
      <div id={styles.buttonDiv}>
        <button id={styles.submitButton} onClick={onClick}>
          Log in <img src='arrow.svg' />
        </button>
      </div>
      <p id={styles.navigate}>
        {type === 'register' ? (
          <>
            Already have an account? <a href='/login'>Sign in</a>
          </>
        ) : (
          <>
            Don't have an account? <a href='/register'>Sign up</a>
          </>
        )}
      </p>
    </div>
  );
}
