import styles2 from '../../../../styles/Dashboard.module.css';

interface TestProps {
  text: string;
  img: string;
}

export default function Test({ text, img }: TestProps) {
  return (
    <div id={styles2.test}>
      <p>{text}</p>
      <img src={img} />
    </div>
  );
}
