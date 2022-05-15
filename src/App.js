import React, { useState } from 'react';

import './App.css';

function App() {
	const [triviaCategory, setTriviaCategory] = useState('any');
	const [triviaDifficulty, setTriviaDifficulty] = useState('any');
	const [questions, setQuestions] = useState([]);

	const fetchApiJson = async (category, difficulty) => {
		const quiz = await fetch(
			`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`
		);
		const json = await quiz.json();
		return json.results;
	};

	const createQuiz = async e => {
		e.preventDefault();

		if (triviaCategory === 'select' || triviaDifficulty === 'select') {
			alert('Please select a category and difficulty');
			return;
		}

		setQuestions(await fetchApiJson(triviaCategory, triviaDifficulty));
	};

	{
		return questions.length < 10 ? (
			<div className='container'>
				<form>
					<h1>Create Quiz</h1>
					{console.log(questions)}
					<select
						name='trivia_category'
						value={triviaCategory}
						onChange={e => setTriviaCategory(e.target.value)}
					>
						<option value='select'>Select Category</option>
						<option value='9'>General Knowledge</option>
						<option value='10'>Entertainment: Books</option>
						<option value='11'>Entertainment: Film</option>
						<option value='12'>Entertainment: Music</option>
						<option value='13'>Entertainment: Musicals &amp; Theatres</option>
						<option value='14'>Entertainment: Television</option>
						<option value='15'>Entertainment: Video Games</option>
						<option value='16'>Entertainment: Board Games</option>
						<option value='17'>Science &amp; Nature</option>
						<option value='18'>Science: Computers</option>
						<option value='19'>Science: Mathematics</option>
						<option value='20'>Mythology</option>
						<option value='21'>Sports</option>
						<option value='22'>Geography</option>
						<option value='23'>History</option>
						<option value='24'>Politics</option>
						<option value='25'>Art</option>
						<option value='26'>Celebrities</option>
						<option value='27'>Animals</option>
						<option value='28'>Vehicles</option>
						<option value='29'>Entertainment: Comics</option>
						<option value='30'>Science: Gadgets</option>
						<option value='31'>
							Entertainment: Japanese Anime &amp; Manga
						</option>
						<option value='32'>Entertainment: Cartoon &amp; Animations</option>
					</select>
					<select
						name='trivia_difficulty'
						value={triviaDifficulty}
						onChange={e => setTriviaDifficulty(e.target.value)}
					>
						<option value='select'>Select Difficulty</option>
						<option value='easy'>Easy</option>
						<option value='medium'>Medium</option>
						<option value='hard'>Hard</option>
					</select>
					<button onClick={createQuiz} type='submit'>
						Start Quiz
					</button>
				</form>
			</div>
		) : (
			<div className='container'>
				{console.log(questions)}
				{questions.map(question => (
					<div key={question.id}>
						<h1>{question.question}</h1>
						<form>
							{question.incorrect_answers.map(answer => (
								<label htmlFor={answer}>
									<input
										type='radio'
										key={answer}
										id={answer}
										name={question.question}
										value={answer}
									/>
									{answer}
								</label>
							))}
						</form>
					</div>
				))}
			</div>
		);
	}
}

export default App;
