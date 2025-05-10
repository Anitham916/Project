import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Input, Button, FormControl, FormLabel, Select, Heading, Text, Flex,useToast } from '@chakra-ui/react';
import axios from 'axios';


const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');


        const toast = useToast();

    const handleLogin = async (e) => {

       try {
        e.preventDefault();
        const formData = {
            email,
            password,
            role
        }

         const data = await axios.post(`/api/login`, formData);
         localStorage.setItem('userData',JSON.stringify(data?.data))
         console.log(data)
         if(data?.data?.role === 'admin')
         {
            navigate('/admin/dashboard');
         }
         else {
            navigate('/employee/dashboard');
         }
         } catch (error) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Something went wrong!',
        status: 'error',
        duration: 3000,
        isClosable: true
      });
    }
    };

    return (
        <Flex minH="100vh" bg="#00796b" align="center" justify="center" p={4}>
            <Box bg="white" p={8} rounded="2xl" shadow="lg" w={{ base: '90%', sm: '400px' }}>
                <Heading mb={6} textAlign="center">Sign In</Heading>
                <form onSubmit={handleLogin}>
                    <FormControl mb={4}>
                        <FormLabel>Email *</FormLabel>
                        <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </FormControl>

                    <FormControl mb={4}>
                        <FormLabel>Password *</FormLabel>
                        <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </FormControl>

                    <FormControl mb={6}>
                        <FormLabel>Role *</FormLabel>
                        <Select placeholder="Select Role" value={role} onChange={(e) => setRole(e.target.value)} required>
                            <option value="admin">Admin</option>
                            <option value="employee">Employee</option>
                        </Select>
                    </FormControl>

                    <Button colorScheme="teal" w="full" type="submit">Login</Button>
                </form>
                <Text mt={4} textAlign="center">
                    Don't have an account? <a href="/signup" style={{ color: '#00796b' }}>Sign Up</a>
                </Text>
            </Box>
        </Flex>
    );
};

export default Login;
