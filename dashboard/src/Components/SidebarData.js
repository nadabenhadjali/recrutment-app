import React from 'react'
import * as Mdcons from "react-icons/md";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import * as GrIcons from "react-icons/gr";

export const SidebarData = [
 

  {
    title: "Offres",
    path: "/offres",
    icon: <Mdcons.MdWork />,
   

    subNav: [
   
   
    ],
  },
  {
    title: "Quizs",
    path: "/Quizs",
    icon: <Mdcons.MdQuiz />,
    

    subNav: [
    
    ],
  },
  {
    title: "Questions",
    path: "/Questions",
    icon: <Mdcons.MdQuiz />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
    

      {
        title: "Sujets",
        path: "/subjects",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "Candidats",
    path: "/candidats",
    icon: <GrIcons.GrDocumentUser />,
  },
];