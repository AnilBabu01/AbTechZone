import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  Image,
} from 'react-native';
import React from 'react';
import Header from '../Component/Header/Header';
import {primary, hightlight} from '../utils/Colors';
import {Height} from '../utils/responsive';
import erp from '../assets/erp1.webp';
import admission from '../assets/admission.png';
import assign from '../assets/assign.jpg';
import fee from '../assets/fee.jpg';
import trans from '../assets/trans.jpg';
const Home = () => {
  return (
    <View>
      <Header />
      <ScrollView>
        <StatusBar backgroundColor={primary} />
        <View style={styles.container}>
          <View style={styles.headerview}>
            <Text style={styles.headerviewtext}>
              Enterprise resource planning (ERP) refers to a type of software
              that organizations use to manage day-to-day business activities
              such as accounting, procurement, project management, risk
              management and compliance, and supply chain operations
            </Text>
            <Image source={erp} style={styles.headerviewimg} />
          </View>
          <View style={styles.bottomview}>
            <Text style={styles.bottomviewtext}>
              Features of Our Erp Website , Android & IOS APP
            </Text>
            <View>
              <Text style={styles.lighttext}>Admission</Text>
              <Text style={styles.normaltext}>
                An admission management system is a digital solution to manage
                student enrollments in colleges, universities, and training
                institutions. Educational institutions use Education CRM to
                distribute inquiries to counselors/admission teams, follow-up
                with leads, and complete the enrollment process digitally.
              </Text>
              <Image source={admission} style={styles.headerviewimg} />
            </View>
            <View>
              <Text style={styles.lighttext}>Assignment</Text>
              <Text style={styles.normaltext}>
                Assign To is a feature in ERPNext that allows you to assign a
                particular document to a specific user, who needs to further
                work on that document. For example, if a Sales Order needs to be
                approved or submitted by the Sales Manager, the first draft user
                can assign that Sales Order to the Sales Manager.
              </Text>
              <Image source={assign} style={styles.headerviewimg} />
            </View>
            <View>
              <Text style={styles.lighttext}>Fee Management</Text>
              <Text style={styles.normaltext}>
                Enterprise resource planning (ERP) refers to a type of software
                that organizations use to manage day-to-day business activities
                such as accounting, procurement, project management, risk
                management and compliance, and supply chain operations
              </Text>
              <Image source={fee} style={styles.headerviewimg} />
            </View>
            <View>
              <Text style={styles.lighttext}>Transport</Text>
              <Text style={styles.normaltext}>
                Transportation management comprises the processes and systems
                used to manage the needs and requirements specific to the
                physical transportation of goods and cargo as part of supply
                chain or logistics management.
              </Text>
              <Image source={trans} style={styles.headerviewimg} />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {},
  headerview: {
    backgroundColor: primary,
    paddingHorizontal: 20,
  },
  headerviewtext: {
    color: 'white',
    lineHeight: Height(30),
    fontSize: 20,
    textAlign: 'center',
  },
  headerviewimg: {
    width: '100%',
    height: Height(250),
    borderRadius: 10,
    marginVertical: 20,
  },
  bottomview: {
    paddingHorizontal: 20,
  },
  bottomviewtext: {
    color: primary,
    textAlign: 'center',
    fontSize: 22,
    paddingVertical: 10,
  },
  lighttext: {
    color: hightlight,
    fontSize: 18,
    textAlign: 'center',
  },
  normaltext: {
    color: primary,
    textAlign: 'center',
    lineHeight: Height(20),
    fontSize: 15,
  },
});
