import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const AttempContainer = ({ question, isStudent }) => {
  const router = useRouter();
  const { p_number } = router.query;
  const [givenmarks, setGivenmarks] = useState(question.marksobtained);
  const [changed, setChanged] = useState(false);
  const [saved, setSaved] = useState(true);
  const markQuestion = async () => {
    await axios
      .post("/api/paper/marking/mark_question", {
        ssa_id: p_number + question.sq_id,
        marksobtained: givenmarks,
      })
      .then((res) => {
        console.log("marked");
      })
      .catch((err) => {
        console.log("error in marking", err.message);
      });
  };
  const setMarks = (e) => {
    if (e.target.value > question.marks) {
      setGivenmarks(question.marks);
      return;
    }
    setGivenmarks(Number(e.target.value));
  };
  useEffect(() => {
    setGivenmarks(question.marksobtained);
  }, [question]);

  return (
    <div className="flex flex-col justify-between pt-0">
      <div>
        <div className="text-2xl mb-2">
          <p>{question.questionnumber + ". " + question.question}</p>
        </div>
        {!question.children ? (
          <div className="px-4 py-2 bg-blue-900 rounded-lg space-y-2 flex flex-col">
            <label className="text-white">
              Answer
              {!question.long_question && (
                <span className="text-gray-200 text-sm">
                  {" "}
                  (Max 50 characters)
                </span>
              )}
            </label>
            <textarea
              className="border border-gray-300 bg-gray-300 rounded-md p-2 w-full text-gray-700 "
              value={question.answer || ""}
              disabled
              rows={question.long_question ? 10 : 2}
            />
            <div className="w-full flex justify-end text-white">
              <div>
                <input
                  className="h-6 w-16 mr-3 rounded-md bg-white text-black accent-blue-600 mt-1 ring-0 focus:outline-none p-2 border text-xs border-gray-300 appearance-none"
                  type="number"
                  value={changed ? givenmarks : question.marksobtained}
                  step={0.5}
                  onChange={(e) => {
                    setSaved(false);
                    setChanged(true);
                    setMarks(e);
                  }}
                  max={question.marks}
                  min={0}
                  disabled={isStudent}
                />
                <span className="font-bold text-sm mr-2">
                  / <span>{question.marks}</span>
                </span>
                {!isStudent && (
                  <button
                    className="bg-green-800 hover:bg-green-700 text-white py-1 px-2 rounded"
                    onClick={() => {
                      if (!question.answer) {
                        alert("Can not mark an answer without answer.");
                        return;
                      }
                      setSaved(true);
                      markQuestion();
                    }}
                  >
                    {!saved ? <>Save Marks</> : <>Marked</>}
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-blue-900 text-white shadow-lg rounded-lg p-4">
            {question.children.map((child) => (
              <AttempContainer
                key={child.sq_id}
                question={child}
                isStudent={isStudent}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AttempContainer;
