import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import Layout from "../src/components/Layout";

const AboutPage: React.FunctionComponent = () => (
  <Layout title="About | Next.js + TypeScript Example">
    <Typography variant="h1">About</Typography>
    <p>This is the about page</p>
    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
  </Layout>
);

export default AboutPage;
