import Footer from "../../components/Footer";
import NavBarIndex from "../../components/NavBarIndex";
import TextCard from "../../components/TextCard";
import styles from './index.module.css';

function Index() {
  return (
    <div className={styles.indexContainer}>
      <NavBarIndex />
      <div className={styles.firstSection}>
        <div className={styles.titles}>
          <span className={styles.title}>PeTinder</span>
          <span className={styles.subtitle}>Seu melhor amigo a um "swipe" de distância</span>
        </div>
        <img className={styles.firstImage} src="./assets/Index/cao-index.png" alt="" />
        <img className={styles.pawPath} src="./assets/Index/patinhas.png" alt="" />
      </div>
      <div className={styles.secondSection}>
        <img className={styles.secondImage} src="./assets/Index/gato-index.png" alt="" />
        <TextCard />
        <img className={styles.paws} src="./assets/Index/patas.png" alt="" />
      </div>
      <Footer />
    </div>
  );
}

export default Index;