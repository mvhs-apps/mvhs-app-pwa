//@ flow

import React from 'react';

import { Text, View, StyleSheet } from 'react-native';
import { COLOR, Card, Avatar, Button } from 'react-native-material-ui';
import type { Profile } from './Links';

const Links = ({ profiles }: { profiles: Profile[] }) => {
  return (
    <View className="links">
      {profiles.map((profile: Profile) => (
        <Card key={profile.name}>
          <View>
            <Avatar
              image={
                profile.image && require('../assets/avatars/' + profile.image)
              }
              text={!profile.image && profile.name.replace(/[^A-Z]/g, '')}
            />
            <Text>{profile.name}</Text>
            <Text>{profile.role}</Text>
            {Object.keys(profile.links).map((name: string) => {
              return (
                <Button key={name} href={profile.links[name]} text={name} />
              );
            })}
          </View>
          <View>{profile.desc && <Text>{profile.desc}</Text>}</View>
        </Card>
      ))}
    </View>
  );
};

export default Links;
