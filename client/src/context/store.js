import React from "react";
import ArticleProvider from "./article";
import BioProvider from "./bio";
import ConsultationProvider from "./consultation";
import ContactUsProvider from "./contactUs";
import HomeVisitProvider from "./homeVisit";
import LectureProvider from "./lecture";
import PersonalSharingProvider from "./personalSharing";
import ReadingProvider from "./reading";
import SentenceProvider from "./sentence";
import SharingProvider from "./sharing";
import UserProvider from "./user";

const Store = ({ children }) => {
  return (
    <UserProvider>
      <ArticleProvider>
        <BioProvider>
          <ConsultationProvider>
            <HomeVisitProvider>
              <LectureProvider>
                <ReadingProvider>
                  <SentenceProvider>
                    <SharingProvider>
                      <ContactUsProvider>
                        <PersonalSharingProvider>
                          {children}
                        </PersonalSharingProvider>
                      </ContactUsProvider>
                    </SharingProvider>
                  </SentenceProvider>
                </ReadingProvider>
              </LectureProvider>
            </HomeVisitProvider>
          </ConsultationProvider>
        </BioProvider>
      </ArticleProvider>
    </UserProvider>
  );
};

export default Store;
