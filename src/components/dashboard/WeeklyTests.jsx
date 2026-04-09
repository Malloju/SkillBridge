import { useEffect, useMemo, useState } from 'react';

const roleFocusMap = {
  'Full-Stack Developer': ['JavaScript', 'React', 'Node.js'],
  'Frontend Developer': ['HTML/CSS', 'JavaScript', 'React'],
  'Backend Developer': ['Node.js', 'Express', 'Databases'],
  'Data Scientist': ['Python', 'Data Analysis', 'Machine Learning'],
  'AI Engineer': ['Python', 'Deep Learning', 'Model Evaluation'],
  'DevOps Engineer': ['Linux', 'Docker', 'CI/CD'],
  'UI/UX Designer': ['User Research', 'Wireframing', 'Prototyping'],
  'Cybersecurity Specialist': ['Network Security', 'Threat Modeling', 'Incident Response'],
  'Blockchain Developer': ['Blockchain Basics', 'Smart Contracts', 'Web3 Integration'],
};

const defaultWeekGoalByRole = {
  'Full-Stack Developer': 'Understand fundamentals and build a small full-stack starter app.',
  'Frontend Developer': 'Build responsive UI components and strengthen JavaScript basics.',
  'Backend Developer': 'Build a secure REST API with validation and authentication basics.',
  'Data Scientist': 'Clean data, run EDA, and present insights from a sample dataset.',
  'AI Engineer': 'Implement a baseline model and evaluate metrics on a starter problem.',
  'DevOps Engineer': 'Containerize an app and run a basic CI pipeline.',
  'UI/UX Designer': 'Create user flows and a clickable low-fidelity prototype.',
  'Cybersecurity Specialist': 'Identify common attack vectors and basic defensive controls.',
  'Blockchain Developer': 'Deploy a simple smart contract and test key functions.',
};

const getWeekGoal = (roadmapSteps, role, weekNumber) => {
  if (Array.isArray(roadmapSteps) && roadmapSteps.length >= weekNumber) {
    const weekData = roadmapSteps[weekNumber - 1] || {};
    if (typeof weekData.description === 'string' && weekData.description.trim()) {
      return weekData.description.trim();
    }
    if (Array.isArray(weekData.mainFocusTopics) && weekData.mainFocusTopics.length > 0) {
      return `Cover ${weekData.mainFocusTopics.slice(0, 3).join(', ')} and complete one practical task.`;
    }
    if (typeof weekData.name === 'string' && weekData.name.trim()) {
      return weekData.name.trim();
    }
  }

  return defaultWeekGoalByRole[role] || `Complete foundational concepts and one practical milestone for Week ${weekNumber}.`;
};

const buildTests = (role, weekGoals) => {
  const roleFocus = roleFocusMap[role] || ['Core Concepts', 'Implementation', 'Problem Solving'];

  return [
    {
      id: 'goal-mastery',
      title: `${role} Week 1 Goal Mastery Test`,
      week: 'Week 1',
      weekNumber: 1,
      questions: 20,
      duration: '30 min',
      level: 'Role-Aligned',
      topic: roleFocus[0],
      goal: weekGoals[0],
      completed: false,
      score: null,
    },
    {
      id: 'concept-accuracy',
      title: `${roleFocus[0]} + ${roleFocus[1]} Week 2 Concept Check`,
      week: 'Week 2',
      weekNumber: 2,
      questions: 20,
      duration: '25 min',
      level: 'Foundation',
      topic: `${roleFocus[0]}, ${roleFocus[1]}`,
      goal: weekGoals[1] || `Validate your understanding of ${roleFocus[0]} and ${roleFocus[1]} for Week 2.` ,
      completed: false,
      score: null,
    },
    {
      id: 'application',
      title: `${role} Week 3 Applied Scenario Test`,
      week: 'Week 3',
      weekNumber: 3,
      questions: 20,
      duration: '20 min',
      level: 'Applied',
      topic: roleFocus[2],
      goal: weekGoals[2] || `Apply learning to a real-world scenario focused on ${roleFocus[2]}.`,
      completed: false,
      score: null,
    },
  ];
};

const getScoreFeedback = (score) => {
  if (score >= 85) return 'Excellent. Move to advanced challenges.';
  if (score >= 70) return 'Great progress. Practice one project this week.';
  if (score >= 50) return 'Good start. Revise weak concepts and retake.';
  return 'Needs improvement. Focus on basics and guided practice.';
};

const generateTestQuestions = (test, weekGoal, careerPath) => {
  const primaryTopic = (test.topic || 'Core Concepts').split(',')[0].trim();
  const practicalGoal = weekGoal || `Complete foundational tasks in ${primaryTopic}.`;

  const questionBank = [
    {
      stem: `For your ${careerPath} roadmap, what is the best Week 1 outcome?`,
      options: ['Finish many advanced topics quickly', `Complete: ${practicalGoal}`, 'Skip practice and only watch videos', 'Avoid role-specific learning goals'],
      correctIndex: 1,
    },
    {
      stem: `Which plan best improves ${primaryTopic} in Week 1?`,
      options: ['One short reading with no exercises', 'Daily focused practice + one mini implementation', 'Only attempt mock interviews', 'Delay practice until Week 4'],
      correctIndex: 1,
    },
    {
      stem: `How should you validate progress for this week's ${test.level.toLowerCase()} test?`,
      options: ['Measure score and identify weak concepts to revise', 'Check only completion status', 'Ignore wrong answers', 'Retake without reviewing mistakes'],
      correctIndex: 0,
    },
    {
      stem: `Which activity is most aligned with the test goal: "${test.goal}"?`,
      options: ['Complete one practical task tied to the topic', 'Read unrelated materials', 'Switch to a different career path mid-week', 'Skip milestone tracking'],
      correctIndex: 0,
    },
    {
      stem: `If your score is below 70% in ${primaryTopic}, what is the best next step?`,
      options: ['Move to advanced topics immediately', 'Revise weak areas and retake with targeted practice', 'Stop testing for the week', 'Only change the role selection'],
      correctIndex: 1,
    },
    {
      stem: `What is the most effective first daily habit for mastering ${primaryTopic}?`,
      options: ['Random browsing without notes', 'Timed practice with short revision notes', 'Only reading summaries', 'Skipping fundamentals'],
      correctIndex: 1,
    },
    {
      stem: `Why is a mini-project useful in Week 1 for ${careerPath}?`,
      options: ['It replaces all theory', 'It applies concepts in a practical context', 'It removes need for feedback', 'It is only for advanced learners'],
      correctIndex: 1,
    },
    {
      stem: `Which indicator best shows you understand ${primaryTopic}?`,
      options: ['You can explain and implement core ideas', 'You watched many videos', 'You bookmarked resources', 'You skipped assessments'],
      correctIndex: 0,
    },
    {
      stem: `What should you do immediately after finishing a quiz in ${primaryTopic}?`,
      options: ['Ignore results', 'Review incorrect answers and retry weak areas', 'Change role path', 'Stop practice for the week'],
      correctIndex: 1,
    },
    {
      stem: `How should Week 1 study time be distributed for better retention?`,
      options: ['Single long cramming session', 'Short daily sessions with active recall', 'Only weekend study', 'No revision cycle'],
      correctIndex: 1,
    },
    {
      stem: `Which behavior reduces mistakes in ${primaryTopic}?`,
      options: ['Skipping debugging', 'Writing and testing small increments', 'Avoiding documentation', 'Ignoring output checks'],
      correctIndex: 1,
    },
    {
      stem: `What is the best way to connect this test with your roadmap goal?`,
      options: ['Treat test as separate task', 'Map missed questions to roadmap revision tasks', 'Ignore roadmap for tests', 'Only track completion'],
      correctIndex: 1,
    },
    {
      stem: `Which action helps convert theory into practical skill for ${careerPath}?`,
      options: ['Memorize definitions only', 'Implement one guided and one independent exercise', 'Skip hands-on work', 'Postpone coding/design practice'],
      correctIndex: 1,
    },
    {
      stem: `What is a good checkpoint by the end of Week 1?`,
      options: ['No output but many plans', 'One working artifact aligned to ${test.goal}', 'Switch goals daily', 'Avoid self-assessment'],
      correctIndex: 1,
    },
    {
      stem: `How should you handle repeated errors in ${primaryTopic}?`,
      options: ['Keep repeating same approach', 'Analyze root cause and practice targeted examples', 'Skip that concept', 'Change role immediately'],
      correctIndex: 1,
    },
    {
      stem: `Which strategy best improves Week 1 test score consistency?`,
      options: ['Practice only easy questions', 'Mix concept review, timed quizzes, and correction logs', 'Avoid timed attempts', 'Ignore weak topics'],
      correctIndex: 1,
    },
    {
      stem: `What should be prioritized before moving to Week 2?`,
      options: ['Completing any random content', 'Clear understanding of Week 1 core topics and milestone', 'Maximum number of resources consumed', 'Only passive reading'],
      correctIndex: 1,
    },
    {
      stem: `Why is feedback after each attempt important?`,
      options: ['It slows learning', 'It identifies precise revision areas', 'It is useful only for final exams', 'It replaces practice'],
      correctIndex: 1,
    },
    {
      stem: `Which is the best revision approach for ${primaryTopic}?`,
      options: ['Reread everything once', 'Spaced repetition on weak concepts with examples', 'Skip revision entirely', 'Only discuss without practice'],
      correctIndex: 1,
    },
    {
      stem: `What does a high-quality Week 1 submission usually include?`,
      options: ['Unfinished draft without testing', 'Working solution, brief notes, and lessons learned', 'No documentation or checks', 'Only screenshots with no explanation'],
      correctIndex: 1,
    },
    {
      stem: `How should you react if this test score improves from last attempt?`,
      options: ['Stop practicing immediately', 'Lock in gains and raise difficulty gradually', 'Ignore progress data', 'Remove roadmap goals'],
      correctIndex: 1,
    },
    {
      stem: `Which step best prepares you for next week's learning?`,
      options: ['Skip planning', 'Summarize Week 1 gaps and set focused Week 2 targets', 'Reset all progress', 'Switch to unrelated topics'],
      correctIndex: 1,
    },
    {
      stem: `What is the strongest signal that Week 1 goal is complete?`,
      options: ['You attempted one quiz', 'You can explain concepts and deliver the planned milestone', 'You watched extra videos', 'You changed timeline frequently'],
      correctIndex: 1,
    },
    {
      stem: `Which practice habit helps long-term retention in ${careerPath}?`,
      options: ['Rare intense sessions only', 'Frequent deliberate practice with reflection', 'No notes and no review', 'Only theory without output'],
      correctIndex: 1,
    },
  ];

  const requiredCount = Math.max(20, Number(test.questions) || 20);
  return questionBank.slice(0, requiredCount).map((item, index) => ({
    id: `q${index + 1}`,
    question: item.stem,
    options: item.options,
    correctIndex: item.correctIndex,
  }));
};

const WeeklyTests = ({ careerPath = 'Full-Stack Developer', roadmapSteps = [] }) => {
  const weekGoals = useMemo(
    () => [1, 2, 3].map((weekNumber) => getWeekGoal(roadmapSteps, careerPath, weekNumber)),
    [roadmapSteps, careerPath]
  );

  const generatedTests = useMemo(
    () => buildTests(careerPath, weekGoals),
    [careerPath, weekGoals]
  );

  const [tests, setTests] = useState(generatedTests);
  const [activeTest, setActiveTest] = useState(null);
  const [activeQuestions, setActiveQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [reports, setReports] = useState({});

  useEffect(() => {
    setTests(generatedTests);
    setActiveTest(null);
    setActiveQuestions([]);
    setSelectedAnswers({});
    setReports({});
  }, [generatedTests]);

  const unlockedTestId = useMemo(() => {
    const nextTest = tests.find((test) => !test.completed);
    return nextTest ? nextTest.id : null;
  }, [tests]);

  const overall = useMemo(() => {
    const completed = tests.filter((t) => t.completed);
    const avgScore = completed.length
      ? Math.round(completed.reduce((acc, t) => acc + (t.score || 0), 0) / completed.length)
      : 0;

    return {
      completedCount: completed.length,
      total: tests.length,
      avgScore,
    };
  }, [tests]);

  const handleTakeTest = (testId) => {
    const test = tests.find((item) => item.id === testId);
    if (!test) return;

    setActiveTest(test);
    if (!test.completed && unlockedTestId && test.id !== unlockedTestId) {
      window.alert(`Please complete ${tests.find((t) => t.id === unlockedTestId)?.week || 'the current week'} test first.`);
      return;
    }

    setActiveQuestions(generateTestQuestions(test, test.goal, careerPath));
    setSelectedAnswers({});
  };

  const handleSelectAnswer = (questionId, optionIndex) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleSubmitTest = () => {
    if (!activeTest || activeQuestions.length === 0) return;

    const unanswered = activeQuestions.some((q) => selectedAnswers[q.id] === undefined);
    if (unanswered) {
      window.alert('Please answer all questions before submitting the test.');
      return;
    }

    const correctCount = activeQuestions.reduce((count, question) => {
      return count + (selectedAnswers[question.id] === question.correctIndex ? 1 : 0);
    }, 0);

    const score = Math.round((correctCount / activeQuestions.length) * 100);
    const wrongQuestions = activeQuestions.filter(
      (question) => selectedAnswers[question.id] !== question.correctIndex
    );
    const improvements = wrongQuestions.slice(0, 5).map((question) => {
      const topicHint = question.question.split('?')[0];
      return `Revise: ${topicHint}. Practice one targeted exercise and retake similar questions.`;
    });

    const defaultImprovements = [
      `Review ${activeTest.topic} fundamentals using your roadmap resources.`,
      'Do one timed practice set and track mistakes in a revision log.',
      'Build one small practical task for this week before the next test.',
    ];

    const report = {
      testId: activeTest.id,
      week: activeTest.week,
      score,
      percentageAttained: score,
      correctCount,
      totalQuestions: activeQuestions.length,
      improvements: improvements.length > 0 ? improvements : defaultImprovements,
      submittedAt: new Date().toLocaleString(),
    };

    setTests((prev) =>
      prev.map((test) =>
        test.id === activeTest.id
          ? {
              ...test,
              completed: true,
              score,
            }
          : test
      )
    );
    setReports((prev) => ({ ...prev, [activeTest.id]: report }));

    setActiveTest(null);
    setActiveQuestions([]);
    setSelectedAnswers({});
  };

  return (
    <div className="page active">
      <h1 className="section-title animate-on-scroll">Weekly Tests</h1>
      <p className="section-subtitle animate-on-scroll">
        One test is assigned per week. Complete the current week's test to unlock the next week.
      </p>

      <div className="widget" style={{ marginBottom: '1rem' }}>
        <p style={{ margin: 0 }}>
          <strong>Selected Role:</strong> {careerPath}
        </p>
        <p style={{ margin: '8px 0 0 0', color: 'var(--text-secondary)' }}>
          <strong>Week 1 Goal:</strong> {weekGoals[0]}
        </p>
      </div>

      <div className="stats-overview" style={{ marginBottom: '1rem' }}>
        <div className="stat-card">
          <div className="stat-info">
            <h3>{overall.completedCount}/{overall.total}</h3>
            <p>Tests Completed</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-info">
            <h3>{overall.avgScore}%</h3>
            <p>Average Score</p>
          </div>
        </div>
      </div>

      {activeTest && (
        <div className="widget" style={{ marginBottom: '1rem' }}>
          <h3 className="widget-title" style={{ marginBottom: '8px' }}>{activeTest.title}</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '14px' }}>{activeTest.goal}</p>

          {activeQuestions.map((question, questionIndex) => (
            <div key={question.id} style={{ marginBottom: '16px' }}>
              <p style={{ marginBottom: '8px' }}>
                <strong>Q{questionIndex + 1}.</strong> {question.question}
              </p>
              <div style={{ display: 'grid', gap: '8px' }}>
                {question.options.map((option, optionIndex) => (
                  <label key={`${question.id}-${optionIndex}`} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                    <input
                      type="radio"
                      name={question.id}
                      checked={selectedAnswers[question.id] === optionIndex}
                      onChange={() => handleSelectAnswer(question.id, optionIndex)}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          <div className="step-actions" style={{ marginTop: '6px' }}>
            <button className="step-btn primary" onClick={handleSubmitTest}>
              <i className="fas fa-check"></i>
              Submit Test
            </button>
            <button
              className="step-btn secondary"
              onClick={() => {
                setActiveTest(null);
                setActiveQuestions([]);
                setSelectedAnswers({});
              }}
            >
              <i className="fas fa-times"></i>
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="resources-grid">
        {tests.map((test) => (
          <div key={test.id} className="resource-card" style={{ alignItems: 'flex-start', cursor: 'default' }}>
            <div className="resource-content" style={{ width: '100%' }}>
              <div className="resource-type">{test.week} • {test.level}</div>
              <h4 className="resource-title">{test.title}</h4>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '8px' }}>
                {test.goal}
              </p>
              <div className="resource-meta" style={{ marginBottom: '12px' }}>
                <span>{test.questions} questions</span>
                <span>{test.duration}</span>
              </div>

              {test.completed ? (
                <>
                  <p style={{ marginBottom: '10px' }}>
                    <strong>Score:</strong> {test.score}%
                  </p>
                  <p style={{ color: 'var(--text-secondary)' }}>{getScoreFeedback(test.score)}</p>
                  {reports[test.id] && (
                    <div className="widget" style={{ marginTop: '12px' }}>
                      <h4 className="widget-title" style={{ marginBottom: '8px' }}>Weekly Test Report</h4>
                      <p style={{ marginBottom: '6px' }}><strong>Week:</strong> {reports[test.id].week}</p>
                      <p style={{ marginBottom: '6px' }}><strong>Score:</strong> {reports[test.id].score}%</p>
                      <p style={{ marginBottom: '6px' }}><strong>Percentage Attained:</strong> {reports[test.id].percentageAttained}%</p>
                      <p style={{ marginBottom: '6px' }}><strong>Correct Answers:</strong> {reports[test.id].correctCount}/{reports[test.id].totalQuestions}</p>
                      <p style={{ marginBottom: '6px' }}><strong>Submitted:</strong> {reports[test.id].submittedAt}</p>
                      <p style={{ marginBottom: '8px' }}><strong>Improvements:</strong></p>
                      <ul style={{ margin: 0, paddingLeft: '18px', color: 'var(--text-secondary)' }}>
                        {reports[test.id].improvements.map((item, idx) => (
                          <li key={`${test.id}-improvement-${idx}`}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <p style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>
                  {unlockedTestId === test.id ? 'Assigned for this week. Attempt now.' : 'Locked until previous week test is completed.'}
                </p>
              )}

              <div className="step-actions" style={{ marginTop: '8px' }}>
                <button
                  className="step-btn primary"
                  onClick={() => handleTakeTest(test.id)}
                  disabled={!test.completed && unlockedTestId !== test.id}
                >
                  <i className="fas fa-pen"></i>
                  {test.completed ? 'Retake Test' : unlockedTestId === test.id ? 'Take Test' : 'Locked'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyTests;
