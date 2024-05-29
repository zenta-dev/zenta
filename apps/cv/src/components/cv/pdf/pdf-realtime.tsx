"use client";

import { usePDF } from "@/provider/pdf-provider";
import {
  Document,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

export const PdfRealtime = () => {
  const styles = StyleSheet.create({
    page: {
      backgroundColor: "white",
      padding: 16,
      display: "flex",
      flexDirection: "column",
    },
    separator: {
      width: "100%",
      height: "1px",
      backgroundColor: "black",
      marginTop: 2,
      marginBottom: 4,
    },
    link: {
      fontSize: 12,
      color: "blue",
    },
    h1: {
      fontSize: 18,
      fontWeight: "bold",
      color: "black",
    },
    h2: {
      fontSize: 16,
      fontWeight: "bold",
      color: "black",
    },
    h3: {
      fontSize: 14,
      fontWeight: "bold",
      color: "black",
    },
    p: {
      fontSize: 12,
    },
    flex_row: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
  });

  const { initialData } = usePDF();
  const personal = initialData?.personal;

  return (
    <Document
      title={initialData?.title}
      author={
        initialData?.user.raw_user_meta_data.name ||
        initialData?.user.raw_user_meta_data.full_name
      }
      onRender={({ blob }) => console.log(blob)}
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.h1}>
          <Text>{personal?.name.toUpperCase()}</Text>
        </View>
        <View style={{ ...styles.flex_row, flexWrap: "wrap" }}>
          {personal?.phone && (
            <Text style={{ ...styles.link }}>
              <Link src={`tel:${personal?.phone}`} style={{ display: "flex" }}>
                {personal?.phone}
              </Link>
            </Text>
          )}
          {personal?.email && (
            <>
              <Text
                style={{
                  ...styles.link,
                  marginLeft: "2px",
                  marginRight: "2px",
                }}
              >
                |
              </Text>
              <Text style={{ ...styles.link }}>
                <Link
                  src={`mailto:${personal?.email}`}
                  style={{ display: "flex" }}
                >
                  {personal?.email}
                </Link>
              </Text>
            </>
          )}
          {personal?.linkedinUrl && (
            <>
              <Text
                style={{
                  ...styles.link,
                  marginLeft: "2px",
                  marginRight: "2px",
                }}
              >
                |
              </Text>
              <Text style={{ ...styles.link }}>
                <Link src={personal?.linkedinUrl} style={{ display: "flex" }}>
                  {personal?.linkedinUrl}
                </Link>
              </Text>
            </>
          )}
          {personal?.portfolioUrl && (
            <>
              <Text
                style={{
                  ...styles.link,
                  marginLeft: "2px",
                  marginRight: "2px",
                }}
              >
                |
              </Text>
              <Text style={{ ...styles.link }}>
                <Link src={personal?.portfolioUrl} style={{ display: "flex" }}>
                  {personal?.portfolioUrl}
                </Link>
              </Text>
            </>
          )}
        </View>
        <View style={{ ...styles.p, color: "grey" }}>
          <Text>{personal?.address}</Text>
        </View>
        <View style={{ ...styles.p, color: "black", marginTop: 12 }}>
          <Text>{personal?.description}</Text>
        </View>
        <View style={{ ...styles.h2, marginTop: 10 }}>
          <Text>Work Experiences</Text>
        </View>
        <View style={styles.separator} />
        {initialData?.experiences.map((experience, index) => (
          <>
            <View
              key={index}
              style={{ ...styles.flex_row, justifyContent: "space-between" }}
            >
              <View>
                <Text style={styles.h3}>{experience.name}</Text>
                <Text style={{ ...styles.p, color: "grey" }}>
                  <span> - </span>
                  {experience.address}
                </Text>
              </View>
              <View>
                <Text style={{ ...styles.p, color: "grey" }}>
                  {experience.start.toLocaleString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}{" "}
                  -{" "}
                  {experience.end === undefined ||
                  experience.end === null ||
                  experience.active
                    ? "Present"
                    : experience?.end.toLocaleString("en-US", {
                        month: "long",
                        year: "numeric",
                      })}
                </Text>
              </View>
            </View>
            <View style={{ ...styles.p, color: "black", fontWeight: 600 }}>
              <Text>{experience.role}</Text>
            </View>
            <View style={{ ...styles.p, color: "grey" }}>
              <Text>{experience.description}</Text>
            </View>
            <View>
              {experience?.achievements.map((achievement, index) => (
                <View key={index}>
                  <ol className="list-inside list-disc">
                    <li style={{ fontSize: 12, color: "black" }}>
                      {achievement}
                    </li>
                  </ol>
                </View>
              ))}
            </View>
          </>
        ))}
        <View style={{ ...styles.h2, marginTop: 10 }}>
          <Text>Education Level</Text>
        </View>
        <View style={styles.separator} />
        {initialData?.educations.map((education, index) => (
          <>
            <View
              key={index}
              style={{ ...styles.flex_row, justifyContent: "space-between" }}
            >
              <View>
                <Text style={styles.h3}>{education.name}</Text>
                <Text style={{ ...styles.p, color: "grey" }}>
                  <span> - </span>
                  {education.address}
                </Text>
              </View>
              <View>
                <Text style={{ ...styles.p, color: "grey" }}>
                  {education.start.toLocaleString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}{" "}
                  -{" "}
                  {education.graduate === undefined ||
                  education.graduate === null ||
                  education.active
                    ? "Present"
                    : education?.graduate.toLocaleString("en-US", {
                        month: "long",
                        year: "numeric",
                      })}
                </Text>
              </View>
            </View>
            <View
              style={{
                ...styles.p,
                color: "black",
                fontWeight: 600,
                ...styles.flex_row,
              }}
            >
              <Text>{education.major}</Text>
              <Text style={{ ...styles.p, color: "grey", marginLeft: "4px" }}>
                <span> - </span>
                {education.gpa}/{education.maxGPA}
              </Text>
            </View>
            <View>
              {education?.activities.map((activity, index) => (
                <View key={index}>
                  <ol className="list-inside list-disc">
                    <li style={{ fontSize: 12, color: "black" }}>{activity}</li>
                  </ol>
                </View>
              ))}
            </View>
          </>
        ))}

        <View style={{ ...styles.h2, marginTop: 10 }}>
          <Text>Organisational Experience</Text>
        </View>
        <View style={styles.separator} />
        {initialData?.organizations.map((organization, index) => (
          <>
            <View
              key={index}
              style={{ ...styles.flex_row, justifyContent: "space-between" }}
            >
              <View>
                <Text style={styles.h3}>{organization.name}</Text>
                <Text style={{ ...styles.p, color: "grey" }}>
                  <span> - </span>
                  {organization.address}
                </Text>
              </View>
              <View>
                <Text style={{ ...styles.p, color: "grey" }}>
                  {organization.start.toLocaleString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}{" "}
                  -{" "}
                  {organization.end === undefined ||
                  organization.end === null ||
                  organization.active
                    ? "Present"
                    : organization?.end.toLocaleString("en-US", {
                        month: "long",
                        year: "numeric",
                      })}
                </Text>
              </View>
            </View>
            <View style={{ ...styles.p, color: "black", fontWeight: 600 }}>
              <Text>{organization.role}</Text>
            </View>
            <View style={{ ...styles.p, color: "grey" }}>
              <Text>{organization.description}</Text>
            </View>
            <View>
              {organization?.achievements.map((achievement, index) => (
                <View key={index}>
                  <ol className="list-inside list-disc">
                    <li style={{ fontSize: 12, color: "black" }}>
                      {achievement}
                    </li>
                  </ol>
                </View>
              ))}
            </View>
          </>
        ))}
        <View style={{ ...styles.h2, marginTop: 10 }}>
          <Text>Other Experiences</Text>
        </View>
        <View style={styles.separator} />
        {initialData?.others.map((other, index) => (
          <>
            <View
              key={index}
              style={{ ...styles.flex_row, justifyContent: "space-between" }}
            >
              <View>
                <Text style={styles.h3}>{other.name}</Text>
                <Text style={{ ...styles.p, color: "grey" }}>
                  <span> - </span>
                  {other.category.slice(0, 1).toUpperCase() +
                    other.category.slice(1)}
                </Text>
              </View>
              <View>
                <Text style={{ ...styles.p, color: "grey" }}>
                  {other.month && other.year
                    ? `${other.month}/${other.year}`
                    : other.year}
                </Text>
              </View>
            </View>
            <View style={{ ...styles.p, color: "grey" }}>
              <Text>{other.description}</Text>
            </View>
            <View>
              {other?.achievements.map((achievement, index) => (
                <View key={index}>
                  <ol className="list-inside list-disc">
                    <li style={{ fontSize: 12, color: "black" }}>
                      {achievement}
                    </li>
                  </ol>
                </View>
              ))}
            </View>
          </>
        ))}
      </Page>
    </Document>
  );
};
