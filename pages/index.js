import Head from "next/head";
import Link from "next/link";
import { getPostMatters } from "../utils/posts";

export default function Home({ posts }) {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {posts.map((post) => {
            return (
              <Link href={`/${post.slug}`}>
                <div style={{ marginBottom: "10px" }} key={post.title}>
                  {post.title} / {post.date}
                </div>
              </Link>
            );
          })}
        </div>
      </main>
      <footer />
    </div>
  );
}

export const getStaticProps = async () => {
  const posts = getPostMatters();

  return {
    props: {
      posts,
    },
  };
};
