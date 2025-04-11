import { useState } from 'react';

export default function CategoryReport() {
  // Simulazione di dati di un quiz completato
  const [quizResults, setQuizResults] = useState({
    categories: {
      c1: { name: "Concetti Base React", correct: 1, total: 2 },
      c2: { name: "Componenti React", correct: 2, total: 3 }
    },
    questions: [
      {
        id: "q1",
        category: "c1",
        text: "Which of the following definitions best describes React.js?",
        userAnswer: [0, 1], // Indici delle risposte selezionate dall'utente
        correctAnswer: [0], // Indici delle risposte corrette
        isCorrect: false,
        answers: [
          { text: "A library to build user interfaces with help of declarative code.", correct: true },
          { text: "A library for managing state in web applications.", correct: false },
          { text: "A framework to build user interfaces with help of imperative code.", correct: false },
          { text: "A library used for building mobile applications only.", correct: false }
        ]
      },
      {
        id: "q2",
        category: "c1",
        text: "What purpose do React hooks serve?",
        userAnswer: [0],
        correctAnswer: [0],
        isCorrect: true,
        answers: [
          { text: "Enabling the use of state and other React features in functional components.", correct: true },
          { text: "Creating responsive layouts in React applications.", correct: false },
          { text: "Handling errors within the application.", correct: false },
          { text: "Part of the Redux library for managing global state.", correct: false }
        ]
      },
      {
        id: "q4",
        category: "c2",
        text: "What is the most common way to create a component in React?",
        userAnswer: [0],
        correctAnswer: [0],
        isCorrect: true,
        answers: [
          { text: "By defining a JavaScript function that returns a renderable value.", correct: true },
          { text: "By defining a custom HTML tag in JavaScript.", correct: false },
          { text: "By creating a file with a .jsx extension.", correct: false },
          { text: "By using the \"new\" keyword followed by the component name.", correct: false }
        ]
      },
      {
        id: "q5",
        category: "c2",
        text: "What does the term \"React state\" imply?",
        userAnswer: [0],
        correctAnswer: [0],
        isCorrect: true,
        answers: [
          { text: "An object in a component that holds values and may cause the component to render on change.", correct: true },
          { text: "The lifecycle phase a React component is in.", correct: false },
          { text: "The overall status of a React application, including all props and components.", correct: false },
          { text: "A library for managing global state in React applications.", correct: false }
        ]
      },
      {
        id: "q6",
        category: "c2",
        text: "How do you typically render list content in React apps?",
        userAnswer: [2],
        correctAnswer: [0],
        isCorrect: false,
        answers: [
          { text: "By using the map() method to iterate over an array of data and returning JSX.", correct: true },
          { text: "By using the for() loop to iterate over an array of data and returning JSX.", correct: false },
          { text: "By using the forEach() method to iterate over an array of data and returning JSX.", correct: false },
          { text: "By using the loop() method to iterate over an array of data and returning JSX.", correct: false }
        ]
      }
    ]
  });

  const [activeCategory, setActiveCategory] = useState('all');

  // Filtra le domande in base alla categoria selezionata
  const filteredQuestions = activeCategory === 'all' 
    ? quizResults.questions 
    : quizResults.questions.filter(q => q.category === activeCategory);

  // Calcola le statistiche generali
  const totalQuestions = quizResults.questions.length;
  const totalCorrect = quizResults.questions.filter(q => q.isCorrect).length;
  const percentageCorrect = Math.round((totalCorrect / totalQuestions) * 100);

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">Report del Quiz</h1>
      
      {/* Riepilogo generale */}
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-sm text-gray-600">Domande totali</p>
            <p className="text-2xl font-bold">{totalQuestions}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Risposte corrette</p>
            <p className="text-2xl font-bold text-green-600">{totalCorrect}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Punteggio</p>
            <p className="text-2xl font-bold">{percentageCorrect}%</p>
          </div>
        </div>
      </div>
      
      {/* Riepilogo per categorie */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Performance per categoria</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(quizResults.categories).map(([catId, category]) => {
            const percentage = Math.round((category.correct / category.total) * 100);
            return (
              <div 
                key={catId}
                className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50"
                onClick={() => setActiveCategory(catId)}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">{category.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    percentage >= 80 ? 'bg-green-100 text-green-800' : 
                    percentage >= 50 ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-red-100 text-red-800'
                  }`}>
                    {category.correct}/{category.total} ({percentage}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      percentage >= 80 ? 'bg-green-500' : 
                      percentage >= 50 ? 'bg-yellow-400' : 
                      'bg-red-500'
                    }`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                {percentage < 80 && (
                  <p className="mt-2 text-sm text-gray-600">
                    <span className="font-medium text-red-600">Consiglio:</span> Rivedi gli argomenti in questa categoria
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Filtri */}
      <div className="flex mb-4 space-x-2 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            activeCategory === 'all' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Tutte le domande
        </button>
        {Object.entries(quizResults.categories).map(([catId, category]) => (
          <button
            key={catId}
            onClick={() => setActiveCategory(catId)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              activeCategory === catId 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
      
      {/* Lista domande filtrate */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">
          {activeCategory === 'all' 
            ? 'Tutte le domande' 
            : `Domande: ${quizResults.categories[activeCategory].name}`}
        </h2>
        
        {filteredQuestions.map((question, index) => (
          <div 
            key={question.id} 
            className={`border rounded-lg p-4 ${
              question.isCorrect ? 'border-green-200' : 'border-red-200'
            }`}
          >
            <div className="flex justify-between items-start">
              <h3 className="font-medium text-gray-800">
                {index + 1}. {question.text}
              </h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                question.isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {question.isCorrect ? 'Corretta' : 'Errata'}
              </span>
            </div>
            
            <div className="mt-3 space-y-2">
              {question.answers.map((answer, answerIndex) => {
                const isUserSelected = question.userAnswer.includes(answerIndex);
                const isCorrect = answer.correct;
                
                let bgColor = '';
                if (isUserSelected && isCorrect) bgColor = 'bg-green-100';
                else if (isUserSelected && !isCorrect) bgColor = 'bg-red-100';
                else if (!isUserSelected && isCorrect) bgColor = 'bg-green-50';
                
                return (
                  <div 
                    key={answerIndex}
                    className={`p-2 rounded flex items-start ${bgColor}`}
                  >
                    <div className="flex-shrink-0 mr-2">
                      {isUserSelected ? (
                        isCorrect ? (
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                        )
                      ) : (
                        isCorrect && (
                          <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        )
                      )}
                    </div>
                    <div className="text-sm">{answer.text}</div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      
      {/* Consigli finali */}
      {percentageCorrect < 80 && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-medium text-blue-900">Suggerimenti per migliorare:</h3>
          <ul className="mt-2 list-disc pl-5 text-sm text-blue-800">
            {Object.entries(quizResults.categories)
              .filter(([_, cat]) => (cat.correct / cat.total * 100) < 80)
              .map(([catId, cat]) => (
                <li key={`suggestion-${catId}`}>
                  Rivedi gli argomenti nella categoria "{cat.name}" ({cat.correct}/{cat.total})
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}