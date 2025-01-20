import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import styled from "styled-components";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	min-height: 100vh;
	background-color: #20232a;
	color: #ffffff;
	font-family: Arial, sans-serif;
`;

const Title = styled.h1`
	font-size: 2.5rem;
	color: #61dafb;
	margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
	display: flex;
	gap: 15px;
	flex-direction: column;
	align-items: center;
`;

const StyledLink = styled.a`
	background-color: #61dafb;
	color: #20232a;
	text-decoration: none;
	padding: 10px 20px;
	border-radius: 5px;
	font-size: 1rem;
	font-weight: bold;
	cursor: pointer;
	transition: background-color 0.3s ease;

	&:hover {
		background-color: #21a1f1;
	}
`;

const Home = () => {
	const { user, error, isLoading } = useUser();

	if (isLoading) return <Container>Loading...</Container>;
	if (error) return <Container>Error: {error.message}</Container>;

	const handleLogin = async () => {
		window.location.href = "/api/auth/login";
	};

	if (user) {
		return (
			<Container>
				<Title>Hello {user.name} 👋</Title>
				<ButtonContainer>
					<StyledLink href="/tasks">Go to Tasks</StyledLink>
					<StyledLink href="/api/auth/logout">Logout</StyledLink>
				</ButtonContainer>
			</Container>
		);
	}

	return (
		<Container>
			<Title>Please Log In</Title>
			<ButtonContainer>
				<button onClick={handleLogin}>Login</button>
			</ButtonContainer>
		</Container>
	);
};

export default Home;
