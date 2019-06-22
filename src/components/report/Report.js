import React, { Component } from "react";
import { PDFExport } from "@progress/kendo-react-pdf";
import ReactDOMServer from "react-dom/server";
import canvg from "canvg";
import { FadeIn } from "./Styled";

class Report extends Component {
  constructor(props) {
    super(props);

    this.leftHeader = [
      {
        text: "www.meu-tesouro.com.br"
      }
    ];

    this.middleHeader = ["Meu Tesouro"];

    this.rightHeader = [
      {
        text: "bit.ly/meu-tesouro"
      }
    ];

    this.mainBody = [
      {
        title: "EDUCATION",
        content: [
          {
            title: "University of Washington - Seattle, Washington",
            rightContent: "June 2020",
            bullets: [
              "GPA: 3.66/4.0 (Deans List)",
              "Bachelor of Science in Informatics working towards a custom Software Development track",
              "Current coursework: Core Methods in Data Science, Informations Systems Analysis and Design, Server Side Development"
            ]
          }
        ]
      },
      {
        title: "EXPERIENCE",
        content: [
          {
            title: "University of Washington iSchool, Undergraduate Tutor",
            rightContent: "Jan 2019 - Present",
            bullets: [
              "Help and tutor students on all technical content in required various Information School courses",
              "Technical Foundations of Informatics, Client Side Development, Databases and Data Modeling, and Server Side Development",
              "Created a tutor hub with written and video tutorials on various topics or covered in the course",
              "Created an interactive tutoring queue to organize questions when busy, and collect data on common problems"
            ]
          },
          {
            title: "University of Washington iSchool, Teaching Assistant",
            rightContent: "Sep 2018 - Dec 2018",
            bullets: [
              "Teach students the foundational skills for building client side applications (INFO 340)",
              "Host lab sections of about 35 students and answering content related questions on a class Slack channel",
              "Grade problem sets and project-based assignments",
              "Hold office hours for help understanding material from basic HTML and CSS to advanced React development"
            ]
          },
          {
            title: "Code and Cognition Lab, Undergraduate Researcher",
            rightContent: "Jun 2018 - Present",
            bullets: [
              "Apply Agile development principles for assisting with research projects",
              "Design, build, and user test computer science tutoring applications using JavaScript/ES6, React, Jest, and Enzyme",
              "Collect, analyze data, and write for a paper on teaching programming strategies to adolescents accepted to SIGCSE 2019"
            ]
          },
          {
            title: "Washington iGEM, Web Development Lead",
            rightContent: "Feb 2017 - Present",
            bullets: [
              "Previously helped design a modular, affordable, bio-reactor along with a novel open-source syringe pump design",
              "Lead a diverse team of six to design and build the team website and iGEM Team Wiki (required for competition judging)"
            ]
          }
        ]
      },
      {
        title: "RECENT PROJECTS",
        content: [
          {
            title: "CodeItz, Code and Cognition Lab",
            rightContent: "June 2018 - Present",
            bullets: [
              "CodeItz is a web tutor that uses a Bayesian Knowledge Tracing algorithm to help users learn programming concepts",
              "Established the framework for writing unit tests in the application and helped removed code redundancy to reduce bugs",
              "Enzyme, Express, Firebase, Flow, JavaScript, Jest, Lodash, MaterialUI, React, React Router, Sass"
            ]
          },
          {
            title:
              "Research Paper - Programming Strategies, Code and Cognition Lab",
            rightContent: "June 2018 - August 2018",
            bullets: [
              "The paper, titled Teaching Explicit Programming Strategies to Adolescents was accepted to SIGCSE 2019",
              "The paper investigates the teaching of explicit programming strategies in the classroom to adolescent students",
              "Aided in the process of data collection, analyzation, and writing to determine if strategy scaffolding correlates to success ",
              "Excel, JavaScript, LaTeX, Ordinal Linear Regression, R"
            ]
          },
          {
            title: "App Development Personal Project - FRC Scouting App 2018",
            rightContent: "March 2018",
            bullets: [
              "A web application that allows the Hawaii Robotics community to visualize their performance at the state championships",
              "The application was built a day before the competition, and had data input in it by my old high school team",
              "The data was released to the local community so teams could see their performance going into the world championship",
              "Bootstrap, D3js, Firebase, JavaScript, React, React Router"
            ]
          }
        ]
      }
    ];

    this.bottom = [
      {
        title: "SKILLS",
        items: [
          {
            title: "Languages: ",
            list: [
              "Golang",
              "JavaScript (ES6+)",
              "Java",
              "Python",
              "SQL",
              "R",
              "LaTeX",
              "C++",
              "CSS",
              "HTML",
              "MATLAB"
            ]
          },
          {
            title: "Tools and Frameworks: ",
            list: [
              "AWS",
              "Docker",
              "git",
              "Firebase",
              "GraphQL",
              "jQuery",
              "NextJS",
              "React",
              "Redis",
              "VueJS"
            ]
          },
          {
            title: "Processes: ",
            list: [
              "Agile Development, Data Analysis, Managing, Research, Teaching, Typescript, Web Development"
            ]
          }
        ]
      }
    ];

    this.canvLoaded = false;
    this.remainingHeightForBody =
      styles().paperStyle.height -
      (styles().paperBorder.padding * 2 + styles().header.height);
  }

  exportPDFWithMethod = () => {
    this.resume.save();
  };

  inchToPixels = inch => {
    return 72 * inch;
  };

  convertSvgToImage = arr => {
    let canv = this.refs.canvas;
    canv.getContext("2d");

    arr.forEach((d, i) => {
      let htmlString = ReactDOMServer.renderToStaticMarkup(<div />);
      canvg(canv, htmlString);
      d.icon = canv.toDataURL("image/png");
    });
  };

  convertBulletToImage = arr => {
    let canv = this.refs.canvas;
    canv.getContext("2d");

    arr.forEach((d, i) => {
      let htmlString = ReactDOMServer.renderToStaticMarkup(<div />);
      canvg(canv, htmlString);
      d.icon = canv.toDataURL("image/png");
    });
  };

  componentDidMount() {
    this.convertSvgToImage(this.leftHeader);
    this.convertSvgToImage(this.rightHeader);
    this.convertSvgToImage(this.mainBody);
    this.convertSvgToImage(this.bottom);
    //this.convertBulletToImage(this.bullet);
    this.forceUpdate();
  }

  render() {
    let resumeObj = (
      <PDFExport
        paperSize={"Letter"}
        fileName="WilliamKwokResume.pdf"
        title="William Kwok"
        subject="William Kwok"
        keywords="William Kwok Resume React Javascript Java Python C++ Vue ReactJS Native VueJS Bootstrap CSS HTML HTML5 JQuery LaTeX NodeJS Node.js Node Git Flow Firebase Router Redux"
        ref={r => (this.resume = r)}
      >
        <div style={styles(this.props.mobile).paperStyle} className={"resume"}>
          <div style={styles().paperBorder}>
            <div>
              {/* =============================== Header =============================== */}
              <div style={styles().header}>
                <div style={{ ...styles().col, ...styles().minHCol }}>
                  <div style={{ ...styles().headerItems }}>
                    {this.leftHeader[0].text}
                  </div>
                </div>
                <div
                  style={{
                    ...styles().col,
                    ...styles().maxHCol,
                    ...styles().middleHeader
                  }}
                >
                  {this.middleHeader[0]}
                </div>
                <div
                  style={{
                    ...styles().col,
                    ...styles().minHCol,
                    ...styles().rightHeader
                  }}
                >
                  {this.rightHeader.map((item, index) => {
                    return (
                      <div
                        middle="xs"
                        style={{ ...styles().headerItems }}
                        key={"hiR" + index}
                      >
                        <span style={styles().headerItemIcon}>
                          <img
                            src={item.icon}
                            alt={""}
                            style={styles().headerIconSize}
                          />
                        </span>
                        {item.text}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* =============================== Main Body =============================== */}
              {this.mainBody.map((bodyItem, index) => {
                return (
                  <div style={{ ...styles().body }} key={"mainBody" + index}>
                    <div
                      middle="xs"
                      style={{ ...styles().bodyHeaders, marginBottom: 3 }}
                    >
                      <span
                        style={{ ...styles().bodyItemIcon, paddingBottom: 3 }}
                      >
                        <img
                          src={bodyItem.icon}
                          alt={""}
                          style={styles().bodyIconSize}
                        />
                      </span>
                      {bodyItem.title}
                    </div>
                    {bodyItem.content.map((contentItem, j) => {
                      return (
                        <div
                          key={"bc" + index + "-" + j}
                          style={{
                            ...styles().bodyContentHeaders,
                            padding: 0,
                            marginBottom: 4
                          }}
                        >
                          <div
                            style={{
                              ...styles().contentItemTitle,
                              width: "70%",
                              paddingLeft: 3,
                              marginBottom: 2
                            }}
                          >
                            {contentItem.title}
                          </div>
                          <div
                            style={{
                              ...styles().contentItemRightContent,
                              width: "30%"
                            }}
                          >
                            {contentItem.rightContent}
                          </div>
                          <ul
                            style={{
                              paddingLeft: 0,
                              margin: 0,
                              fontSize: 8,
                              listStyleType: "none"
                            }}
                          >
                            {contentItem.bullets.map((bullet, k) => {
                              return (
                                <li
                                  key={"bc" + index + "-" + j + "-" + k}
                                  style={{ marginBottom: 0, paddingLeft: 7 }}
                                >
                                  <span
                                    style={{ marginLeft: -4, fontSize: 10 }}
                                  >
                                    {/* <img
                                      alt={""}
                                      src={this.bullet[0].icon}
                                      style={{
                                        width: 3,
                                        height: 3,
                                        marginRight: 5
                                      }}
                                    /> */}
                                    {bullet}
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                );
              })}

              {/* =============================== Bottom =============================== */}
              {this.bottom.map((bodyItem, index) => {
                return (
                  <div style={{ ...styles().body }} key={"bottomBody" + index}>
                    <div
                      middle="xs"
                      style={{ ...styles().bodyHeaders, marginBottom: 3 }}
                    >
                      <span
                        style={{ ...styles().bodyItemIcon, paddingBottom: 3 }}
                      >
                        <img
                          src={bodyItem.icon}
                          alt={""}
                          style={styles().bodyIconSize}
                        />
                      </span>
                      {bodyItem.title}
                    </div>
                    {bodyItem.items.map((contentItem, j) => {
                      return (
                        <div
                          key={"bc" + index + "-" + j}
                          style={{
                            ...styles().bodyContentHeaders,
                            padding: 0,
                            marginBottom: 0
                          }}
                        >
                          <div
                            style={{
                              ...styles().contentItemTitle,
                              paddingLeft: 3,
                              marginBottom: 2
                            }}
                          >
                            {contentItem.title}
                            <span
                              style={{
                                fontSize: 10,
                                color: "black",
                                fontWeight: "normal"
                              }}
                            >
                              {contentItem.list.join(", ")}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </PDFExport>
    );

    return (
      <div>
        <div>
          <div style={{ width: "100%" }}>
            {!this.canvLoaded && (
              <canvas ref="canvas" style={{ display: "none" }}></canvas>
            )}
            <FadeIn>
              <div>
                <div
                  style={{
                    margin: "auto",
                    textAlign: "center",
                    marginBottom: 10
                  }}
                >
                  <div
                    onClick={this.exportPDFWithMethod}
                    style={{
                      cursor: "pointer",
                      margin: "auto",
                      textDecoration: "none",
                      color: "#005696",
                      minWidth: "60px",
                      textAlign: "center"
                    }}
                  >
                    Download PDF
                  </div>
                </div>
                <div>{resumeObj}</div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    );
  }
}

export default Report;

const styles = mobile => {
  return {
    paperStyle: {
      height: 792,
      width: 612,
      padding: "none",
      backgroundColor: "white",
      boxShadow: "5px 5px 5px #888888",
      margin: "auto",
      overflowX: "hidden",
      overflowY: "hidden"
    },
    paperBorder: {
      height: "100%",
      width: "100%",
      padding: 12,
      overflowX: "hidden",
      overflowY: "hidden"
    },
    header: {
      height: 60,
      padding: 0,
      margin: 0
    },
    body: {
      padding: 0,
      margin: 0
    },
    bodyHeaders: {
      color: "#005696",
      fontSize: 19,
      fontWeight: "bold",
      margin: 0,
      width: "100%",
      paddingBottom: 4,
      borderBottom: "0.5px solid #005696"
    },
    bodyContentHeaders: {
      margin: 0,
      width: "100%"
    },
    contentItemTitle: {
      color: "#005696",
      fontSize: 12,
      fontWeight: "bold",
      padding: 0
    },
    contentItemRightContent: {
      fontSize: 12,
      textAlign: "right",
      padding: 0
    },
    col: {
      padding: 0
    },
    headerItems: {
      fontSize: 10.5,
      color: "#005696",
      marginLeft: 0,
      marginBottom: 3 // between header items
    },
    headerItemIcon: {
      textDecoration: "none",
      textAlign: "center",
      marginRight: 5
    },
    bodyItemIcon: {
      textDecoration: "none",
      textAlign: "center",
      marginRight: 5
    },
    minHCol: {
      width: (612 - 24) / 4 + "px"
    },
    maxHCol: {
      width: (612 - 24) / 2 + "px"
    },
    middleHeader: {
      textAlign: "center",
      fontSize: 40,
      fontWeight: "bold",
      color: "#005696"
    },
    rightHeader: {
      paddingLeft: 35 /// padding for right header
    },
    headerIconSize: {
      height: 15,
      width: 15
    },
    bodyIconSize: {
      height: 20,
      width: 20
    }
  };
};
