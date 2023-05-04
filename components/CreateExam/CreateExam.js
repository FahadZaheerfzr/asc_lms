import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Wizard from "../Common/Wizard/Wizard";
import Form from "../Common/Form/Form";
import MCQTable from "../CreateObjective/ObjectiveExam";
import Exam from "../Exam/Exam";
import axios from "axios";
import SubjectiveExam from "../CreateSubjective/SubjectiveExam";
import IeExam from "../CreateIE/IeExam";
import WordExam from "../CreateWord";

const wizardItemsObjective = [
  {
    id: 1,
    title: "Exam Settings",
  },
  {
    id: 2,
    title: "Exam Questions",
  },
  {
    id: 3,
    title: "Exam Review",
  },
];

const wizardItemsSubjective = [
  {
    id: 1,
    title: "Exam Settings",
  },
  {
    id: 2,
    title: "Objective Questions",
  },
  {
    id: 3,
    title: "Subjective Questions",
  },
  {
    id: 4,
    title: "Exam Review",
  },
];

export default function CreateExam({ paperType }) {
  const router = useRouter();

  const [examDetails, setExamDetails] = useState(null);
  const [active, setActive] = useState(1);
  const [paperId, setPaperId] = useState(
    Object.keys(router.query).length > 1 ? router.query.paper_id : 0
  );
  const [exam, setExam] = useState();
  const [mcqs, setMCQs] = useState([]);
  const [subjectives, setSubjectives] = useState([]);
  const [freeFlowGlobal, setFreeFlowGlobal] = useState(false);
  const [ieFiles, setIeFiles] = useState([]);

  useEffect(() => {
    if (router.isReady) {
      setPaperId(
        Object.keys(router.query).length > 1 ? router.query.paper_id : 0
      );
      setExamDetails(
        Object.keys(router.query).length > 1 ? router.query : null
      );
    }
  }, [router]);

  const fetchExam = async () => {
    const res = await axios.post("/api/faculty/get_exam", {
      paper_id: paperId,
    });
    setExam(res.data);
  };

  const fetchObjectives = async () => {
    const res = await axios.post("/api/faculty/get_objective", {
      paper_id: paperId,
    });
    setMCQs(res.data);
  };

  const fetchIeFiles = async () => {
    const res = await axios.get(`/api/faculty/get_ie_files`, {
      params: {
        paperId: paperId,
      },
    });
    setIeFiles(res.data);
  };

  const fetchSubjectives = async () => {
    await axios
      .post("/api/faculty/get_subjective", {
        paper_id: paperId,
      })
      .then((res) => {
        const allQuestion = res.data;
        setSubjectives(res.data.filter((question) => !question.parent_sq_id));
        // console.log("allQuestion", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (paperId && !exam) {
      fetchExam();
    }
    if ((paperType === "Objective" || paperType === "Word") && paperId) {
      fetchObjectives();
    }
    if (paperType === "Subjective/Objective" && paperId) {
      fetchObjectives();
      fetchSubjectives();
    }
    if (paperType === "IE" && paperId) {
      fetchIeFiles();
    }
  }, [paperId, exam, paperType]);

  return (
    <div className="w-full px-6 mt-2">
      {}
      <Wizard
        paperId={exam?.paper_id}
        active={active}
        setActive={setActive}
        paperName={exam?.paper_name}
        items={
          paperType === "Subjective/Objective"
            ? wizardItemsSubjective
            : wizardItemsObjective
        }
      />

      {active === 1 && (
        <Form
          setActive={setActive}
          setPaperId={setPaperId}
          examDetails={examDetails}
          setExam={setExam}
          paperType={paperType}
          setFreeFlowGlobal={setFreeFlowGlobal}
        />
      )}

      {active === 2 &&
        paperId !== 0 &&
        paperType !== "IE" &&
        paperType !== "Word" && (
          <div className="mt-10">
            <MCQTable
              exam={exam}
              setExam={setExam}
              paperId={paperId}
              setActive={setActive}
              objective_questions={mcqs}
              setObjectiveQuestions={setMCQs}
              freeFlow={freeFlowGlobal}
            />
          </div>
        )}

      {active === 2 && paperId !== 0 && paperType === "IE" && (
        <div className="mt-10">
          <IeExam
            paperId={paperId}
            setActive={setActive}
            exam={exam}
            ieFiles={ieFiles}
          />
        </div>
      )}

      {active === 2 && paperType === "Word" && (
        <div className="mt-10">
          <WordExam
            paperId={paperId}
            setExam={setExam}
            setActive={setActive}
            objectiveQuestions={mcqs}
            setObjectiveQuestions={setMCQs}
          />
        </div>
      )}

      {active === 3 &&
        paperId !== 0 &&
        paperType !== "Subjective/Objective" && (
          <div className="mt-10">
            <Exam
              exam={exam}
              objectiveQuestions={mcqs}
              subjectiveQuestions={subjectives}
              isEdit={true}
              setActive={setActive}
            />
          </div>
        )}

      {active === 3 &&
        paperId !== 0 &&
        paperType === "Subjective/Objective" && (
          <div className="mt-10">
            <SubjectiveExam
              exam={exam}
              setExam={setExam}
              paperId={paperId}
              setActive={setActive}
              subjective_questions={subjectives}
              setSubjectiveQuestions={setSubjectives}
            />
          </div>
        )}

      {active === 4 &&
        paperId !== 0 &&
        paperType === "Subjective/Objective" && (
          <div className="mt-10">
            <Exam
              exam={exam}
              objectiveQuestions={mcqs}
              subjectiveQuestions={subjectives}
              isEdit={true}
              setActive={setActive}
            />
          </div>
        )}
    </div>
  );
}