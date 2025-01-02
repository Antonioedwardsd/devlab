import { fetchTasks } from "./api/todos";

export const getServerSideProps = async () => {
	try {
		const todos = await fetchTasks();
		return { props: { todos } };
	} catch (error) {
		console.error("Error fetching todos:", error);
		return { props: { todos: [] } };
	}
};

const Home = ({ todos = [] }: { todos: any[] }) => {
	return (
		<div>
			<h1>My Todos</h1>
			<ul>
				{todos.length > 0 ? (
					todos.map((todo) => <li key={todo.id}>{todo.title}</li>)
				) : (
					<li>No todos available</li>
				)}
			</ul>
		</div>
	);
};

export default Home;
