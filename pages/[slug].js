import { getAllPosts, getPost } from "../utils/posts";

const Post = ({ post }) => {
  return (
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
      <span>{post.slug}.md</span>
      <h1>{post.title}</h1>
      <h3>{post.date}</h3>
      <div dangerouslySetInnerHTML={{ __html: post.postHtml }} />
    </div>
  );
};

export default Post;

export const getStaticPaths = async () => {
  const posts = getAllPosts();
  const paths = posts.map((post) => {
    return {
      params: {
        slug: post.split(".")[0],
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const post = await getPost(params.slug);
  return {
    props: { post },
  };
};
