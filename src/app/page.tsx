import styles from "./page.module.css";
import { Container, Heading, Section, Text } from '@radix-ui/themes';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Container size='4'>
          <Section size='4'>
            <Heading as='h1' size='9' mb='8'>Learn how Multi:Links can bust your productivity</Heading>
            <Text>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores nisi aliquid aliquam ab odio maxime maiores et, eos doloribus ut rerum minima voluptatibus. Atque, sunt commodi a iure sapiente voluptates.
            </Text>
          </Section>
        </Container>
      </main>
      <footer className={styles.footer}>
      </footer>
    </div>
  );
}
