import { Box, Button, TextField } from '@mui/material'
import { Formik } from 'formik';
import React from 'react';
import { FakePaymentValue } from '../../assets/formAssets/initialValues';
import { fakepaymentSchema } from '../../assets/formAssets/validationSchema';
import styles from "./FakePayment.module.css";
import {RiMastercardFill, RiVisaLine} from "react-icons/ri";

function FakePayment({priceData,bookCampgroundApi}) {

  return (
    <Box>
        <Formik
            initialValues={FakePaymentValue}
            onSubmit={(values, { resetForm }) => {
                bookCampgroundApi();
            }}
            validationSchema={fakepaymentSchema}
            validateOnChange={true}
            validateOnBlur={true}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
              /* and other goodies */
            }) => (
              <form onSubmit={handleSubmit}>
                <Box className={styles.cardMain}>
                  <Box className={styles.flex}>
                    <Box flex={3}>
                      <Box>
                        <Box className={styles.label}>Owner</Box>
                        <Box>
                          <TextField
                            onChange={handleChange}
                            autoComplete={"off"}
                            fullWidth
                            value={values.owner.trim()}
                            size={"small"}
                            placeholder={"Enter Owner"}
                            name={"owner"}
                          />
                          <Box className={styles.errorText}>
                            {errors.owner && touched.owner && errors.owner + "*"}
                          </Box>
                        </Box>
                      </Box>
                    </Box>

                    <Box flex={1}>
                      <Box>
                        <Box className={styles.label}>CVV</Box>
                        <Box>
                          <TextField
                            onChange={handleChange}
                            autoComplete={"off"}
                            fullWidth
                            value={values.cvv.trim()}
                            size={"small"}
                            placeholder={"Enter CVV"}
                            name={"cvv"}
                          />
                          <Box className={styles.errorText}>
                            {errors.cvv &&
                              touched.cvv &&
                              errors.cvv + "*"}
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>

                </Box>


                <Box className={styles.cardMain}>
              
                  <Box className={styles.flex}>
                

                  <Box flex={3}>
                      <Box>
                        <Box className={styles.label}>Card Number</Box>
                        <Box>
                          <TextField
                            onChange={handleChange}
                            autoComplete={"off"}
                            fullWidth
                            value={values.cardNumber.trim()}
                            size={"small"}
                            placeholder={"Enter Card Number"}
                            name={"cardNumber"}
                          />
                          <Box className={styles.errorText}>
                            {errors.cardNumber && touched.cardNumber && errors.cardNumber + "*"}
                          </Box>
                        </Box>
                      </Box>
                    </Box>            

                    <Box flex={1}>
                      <Box>
                        <Box className={styles.label}>Expiry</Box>
                        <Box>
                          <TextField
                            onChange={handleChange}
                            autoComplete={"off"}
                            fullWidth
                            value={values.expiry}
                            type={"month"}
                            size={"small"}
                            name={"expiry"}
                          />
                          <Box className={styles.errorText}>
                            {errors.expiry && touched.expiry && errors.expiry + "*"}
                          </Box>
                        
                        </Box>
                      </Box>       
                    </Box>
                  </Box>
                  <Box className={styles.flex}>
                        <Box display={"flex"} columnGap={"20px"}><RiVisaLine fontSize={"45px"}/><RiMastercardFill className={styles.master} fontSize={"45px"}/></Box>
                        <Box>Price: ₹ {priceData.people*priceData.days*priceData.price}</Box>
                        </Box>   
                    <Button type='submit' variant='outlined' fullWidth>Proceed</Button>            
                </Box>
              </form>
            )}
          </Formik>
    </Box>
  )
}

export default FakePayment