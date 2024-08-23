import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, FlatList, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from "../../lib/supabase";
import { OPENAI_API_KEY } from '../../services/botSevices';
import { Header } from '../../components/Header';
import { hp, wp } from '../../helpers/common';
import Avatar from '../../components/avatar';
import { theme } from '../../constants/theme';
import { useAuth } from '../../contexts/AuthContext';

const userIcon = 'https://path-to-your-user-icon.png'; // URL de l'icône de l'utilisateur
const botIcon = 'https://path-to-your-bot-icon.png'; // URL de l'icône du bot

const ChatbotScreen = () => {
 const {user,setAuth} = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Erreur lors de la récupération des messages:', error);
    } else {
      setMessages(data);
    }
  };

  const handleSendMessage = async () => {
    if (input.trim().length === 0) return;

    const newMessage = { user: 'user', text: input };
    setMessages(prevMessages => [...prevMessages, newMessage]);

    const { error } = await supabase
      .from('messages')
      .insert([{ user: 'user', text: input, created_at: new Date() }]);

    if (error) {
      console.error('Erreur lors de l\'ajout du message:', error);
    }

    const response = await fetchGPTResponse(input);
    if (response) {
      const botMessage = { user: 'bot', text: response };
      setMessages(prevMessages => [...prevMessages, botMessage]);

      const { error } = await supabase
        .from('messages')
        .insert([{ user: 'bot', text: response, created_at: new Date() }]);

      if (error) {
        console.error('Erreur lors de l\'ajout de la réponse du bot:', error);
      }
    }

    setInput('');
  };

  const fetchGPTResponse = async (userInput) => {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: userInput }],
          max_tokens: 150,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response:', data);

      if (data && data.choices && data.choices.length > 0) {
        return data.choices[0].message.content.trim();
      } else {
        throw new Error('La réponse de l\'API GPT est invalide ou vide.');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération de la réponse GPT:', error);
      return 'Désolé, je ne peux pas répondre pour le moment.';
    }
  };

  const renderMessage = ({ item }) => (
    <View style={item.user === 'user' ? styles.userMessage : styles.botMessage}>
        <Avatar
                size={hp(4.5)}
                uri={user?.image}
                rounded={theme.radius.md}
                />
      <Text style={item.user === 'user' ? styles.userMessageText : styles.botMessageText}>
        {item.text}
      </Text>
    </View>
  );

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: wp(4), top: 5 }}>
      <View style={{ top: 20 }}>
        <Header title="ConnectIT bot" mb={30} />
      </View>
      <View style={styles.container}>
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.chatContainer}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Tapez votre message..."
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
            <Ionicons name="send" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  chatContainer: {
    padding: 10,
  },
  userMessage: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    backgroundColor: '#2196F3',
    borderRadius: 20,
    padding: 10,
    marginVertical: 5,
    maxWidth: '80%',
  },
  botMessage: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: '#E1E1E1',
    borderRadius: 20,
    padding: 10,
    marginVertical: 5,
    maxWidth: '80%',
  },
  userMessageText: {
    color: '#fff',
    marginLeft: 10,
  },
  botMessageText: {
    color: '#000',
    marginLeft: 10,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ccc',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  input: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  sendButton: {
    width: 40,
    height: 40,
    backgroundColor: '#2196F3',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ChatbotScreen;
