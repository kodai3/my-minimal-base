import Link from "next/link";
import * as React from "react";
import firebase from "src/firebase/clientApp";
import Layout from "../src/components/Layout";

const IndexPage = () => {
  React.useEffect(() => {
    (async () => {
      const snaps = await firebase.firestore().collection("title").get();
      console.log(
        snaps.docs.map((doc) => doc.data()),
        "title"
      );
    })();
  }, []);
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <h1>Hello Medic 👋</h1>
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p>
    </Layout>
  );
};

export default IndexPage;
