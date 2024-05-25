import TaskList from "@/components/TaskList";

const Home = async ({}) => {
  return (
    <div className="h-screen overflow-auto">
      <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-10">
        <h1 className="text-2xl sm:text-4xl font-black tracking-wide text-center py-6">
          Welcome to Task Manager
        </h1>
      </header>

      <main className="pt-[88px] sm:pt-[120px] grid place-items-center">
        <TaskList />
      </main>
    </div>
  );
};

export default Home;
