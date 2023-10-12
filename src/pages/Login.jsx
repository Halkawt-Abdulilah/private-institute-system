import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  FormErrorMessage
} from '@chakra-ui/react'
import * as Yup from 'yup'
import {useFormik,} from 'formik'

export default function LoginPage() {

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(8,'Password must be at least 8 characters').required('Password is required'),
  });

  const {values, errors, touched, handleBlur, handleChange, handleSubmit, resetForm, setFieldValue} = useFormik({
    initialValues: {
        email: '',
        password: '',
    },

    validationSchema: validationSchema,

    onSubmit: async () => {
      const data = {email: values.email, password: values.password}
      console.log(data);
      try {
        await fetch('/login', {
          method: 'POST',
          headers: {
            'Content-Type':'application/json'
          },
          body: JSON.stringify(data)
        }).then(
          window.location.href = './Dashboard'
        )
      } catch(err) {
        console.log(err);
      }
    },
  });

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Login</Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <form onSubmit={handleSubmit}>
              <FormControl id="email" isInvalid={errors.email && touched.email}>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  onChange={(e) => {
                    setFieldValue('email', e.target.value)
                  }}
                  value={values.email}
                  onBlur={handleBlur}
                  className={errors.email && touched.email ? "input-error" : ""}
                  required="required"
                />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl id="password" isInvalid={errors.password && touched.password}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  onChange={(e) => {
                    setFieldValue('password', e.target.value)
                  }}
                  value={values.password}
                  onBlur={handleBlur}
                  className={errors.password && touched.password ? "input-error" : ""}
                  required="required"
                />
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Checkbox>Remember me</Checkbox>
                </Stack>
                <Button type='submit'
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Sign in
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}
