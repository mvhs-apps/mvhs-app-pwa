//@ flow

import React from 'react';

import './Credits.css';

import Card, { CardActions, CardContent, CardHeader } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';

export type Profile = {
  name: string,
  role: string,
  desc: string,
  links: { [string]: string }
};

const Credits = ({ profiles }: { profiles: Profile[] }) => {
  return (
    <div className="about">
      {profiles.map((profile: Profile) =>
        <Card className="about-card" key={profile.name}>
          <CardHeader
            className={profile.desc ? '' : 'about-header-no-body'}
            avatar={
              <Avatar
                className="about-avatar"
                src={profile.image && require('../assets/' + profile.image)}
              >
                {!profile.image && profile.name.replace(/[^A-Z]/g, '')}
              </Avatar>
            }
            title={profile.name}
            subheader={profile.role}
          />
          <CardContent
            className={
              'about-content ' + (profile.desc ? '' : 'about-content-no-body')
            }
          >
            {profile.desc &&
              <Typography>
                {profile.desc}
              </Typography>}
          </CardContent>
          <CardActions>
            {Object.keys(profile.links).map((name: string) => {
              return (
                <Button
                  dense
                  href={profile.links[name]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {name}
                </Button>
              );
            })}
          </CardActions>
        </Card>
      )}
    </div>
  );
};

export default Credits;
