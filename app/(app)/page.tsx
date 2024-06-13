import Post from "@/components/post/post";
import Wall from "@/components/profile/Wall/wall";
import axios from "axios";

export default async function Home() {
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const posts = (await axios.get(serverUrl + "/posts")).data;
  console.log(posts);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <h1 style={{ fontSize: "32px" }}>Лента новостей</h1>
      <Wall>
        <ul>
          {posts.length > 0 &&
            [...posts].reverse().map((post: any) => {
              return (
                <Post
                  hasDelete={false}
                  key={post.id}
                  id={post.id}
                  RefreshPosts={null}
                />
              );
            })}
        </ul>
      </Wall>
    </main>
  );
}
