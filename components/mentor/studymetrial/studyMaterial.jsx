import StudyMaterialCard from "@/components/mentor/studymetrial/card";
import {
  StudyMaterialProvider,
  useStudyMaterialContext,
} from "@/lib/context/StudyMaterialContext";
import React, { useMemo } from "react";
import MetrialInfo from "@/components/mentor/studymetrial/metrialinfo";
import Select from "react-select";
import Nodata from "@/components/common/nodata/nodata";

function StudyMaterialMain() {
  const {
    modules,
    selectedModule,
    setSelectedModule,
    joinedCourses,
    setCourseID,
    courseID,
    isMentor,
  } = useStudyMaterialContext();

  const handleCardClick = (module) => {
    setSelectedModule(module);
  };

  const selectedCourse = useMemo(() => {
    const course = joinedCourses?.find((item) => item.id === courseID);
    return {
      value: course?.id,
      label: course?.title,
    };
  }, [courseID, joinedCourses]);

  console.log("selectedCourseName", selectedCourse.value === undefined);

  if (selectedCourse.value === undefined) {
    return (
      <div className=" flex items-center justify-center w-full h-screen mb-5">
        <Nodata title="Course" value="No Course available" />
      </div>
    );
  }
  return (

    <div className="mt-5 mx-8 w-full">

      {!selectedModule && (
        <>
          {!isMentor && (
            <Select
              className="basic-single"
              classNamePrefix="select"
              defaultValue={selectedCourse}
              onChange={(e) => {
                setCourseID(e.value);
                setSelectedModule(null);
              }}
              value={selectedCourse}
              isClearable={false}
              isSearchable={false}
              name="course"
              options={joinedCourses?.map((course) => ({
                value: course.id,
                label: course.title,
              }))}
              styles={{
                container: (base) => ({
                  ...base,
                  maxWidth: "300px",
                  width: "100%",
                  background: "#373A41",
                  outline: "none",
                  color: "white",
                }),

                control: (base, state) => ({
                  ...base,
                  background: "#373A41",
                  outline: "none",
                  color: "white",
                }),
                menu: (base) => ({
                  ...base,
                  background: "#373A41",
                  outline: "none",
                  color: "white",
                }),
                singleValue: (base) => ({
                  ...base,
                  color: "white",
                }),
                option: (
                  styles,
                  { data, isDisabled, isFocused, isSelected }
                ) => ({
                  ...styles,
                  backgroundColor: "#373A41",
                  cursor: "pointer",
                  ":hover": {
                    ...styles[":hover"],
                    backgroundColor: "#2E3036",
                  },
                  ":focus": {
                    ...styles[":focus"],
                    backgroundColor: "#2E3036",
                  },
                }),
              }}
            />
          )}
          <div className="md:mx-auto mt-6 text-white grow flex items-center">
          <div className="flex bg-[#373A41] rounded-[30px] h-full justify-center">
            <div className="grid grid-cols-1 md:grid-rows-2 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 m-8">
              {modules?.map((module, index) => (
                <StudyMaterialCard
                  key={index}
                  module={module}
                  onClick={() => {
                    handleCardClick(module);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        </>
      )}

      {selectedModule && <MetrialInfo />}
    </div>
  );
}

export default function StudyMaterialWithContext() {
  return (
    <StudyMaterialProvider>
      <StudyMaterialMain />
    </StudyMaterialProvider>
  );
}
