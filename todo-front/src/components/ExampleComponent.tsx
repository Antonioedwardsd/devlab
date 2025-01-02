import styled from "styled-components";

const Button = styled.button`
	background-color: #0070f3;
	color: white;
	padding: 10px 20px;
	border: none;
	border-radius: 5px;
	cursor: pointer;

	&:hover {
		background-color: #005bb5;
	}
`;

const ExampleComponent = () => {
	return <Button>Click Me!</Button>;
};

export default ExampleComponent;
