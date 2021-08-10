import fs from "fs";
import path from "path";
import matter from "gray-matter";
import remark from "remark";
import html from "remark-html";

const postPath = path.join(process.cwd(), "posts");

export const getAllPosts = () => {
  const files = fs.readdirSync(postPath);
  return files.map((file) => file);
};

export const getPostMatters = () => {
  return getAllPosts().map((post) => {
    const filePath = path.join(process.cwd(), "posts", post);
    const file = fs.readFileSync(filePath, "utf8");

    const fileMatter = matter(file);
    return {
      slug: post.split(".")[0],
      title: fileMatter.data.title,
      date: fileMatter.data.date,
    };
  });
};

export const getPost = async (slug) => {
  const rawFile = fs.readFileSync(path.join(postPath, `${slug}.md`));

  const fileMatter = matter(rawFile);

  const postHtml = (
    await remark().use(html).process(fileMatter.content)
  ).toString();

  return {
    slug,
    postHtml,
    ...fileMatter.data,
  };
};
