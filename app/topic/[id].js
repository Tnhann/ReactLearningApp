import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import TopicDetailScreen from '../../src/screens/TopicDetailScreen';

export default function TopicDetail() {
  const { id } = useLocalSearchParams();
  return <TopicDetailScreen topicId={id} />;
}
