"use client"
import React, { useState } from 'react';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Box,
  Typography,
  Paper,
  Grid,
} from '@mui/material';

const activityLevels = [
  'Sedentary',
  'Lightly active',
  'Moderately active',
  'Very active',
  'Super active',
];

const dietaryPreferences = [
  'Vegetarian',
  'Vegan',
  'Pescatarian',
  'Keto',
  'Paleo',
  'Gluten-Free',
  'Dairy-Free',
  'Nut-Free',
  'Halal',
  'Kosher',
  'Low-Carb',
  'Low-Fat',
  'High-Protein',
  'Mediterranean',
  'FODMAP',
  'Sugar-Free',
];

const weightGoals = [
  'Lose weight',
  'Maintain weight',
  'Gain muscle',
];

const UserProfileQuiz = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    height_cm: '',
    weight_kg: '',
    activity_level: '',
    dietary_preferences: [] as string[],
    allergies: [] as string[],
    health_conditions: [] as string[],
    weight_goal: '',
    past_meals: [] as string[],
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name as string]: value,
    }));
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked
        ? [...(prev[name as keyof typeof prev] as string[]), value]
        : (prev[name as keyof typeof prev] as string[]).filter((item) => item !== value),
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: 'auto', my: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Personal Health Profile
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Age"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              inputProps={{ min: 0, max: 120 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Gender</InputLabel>
              <Select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                label="Gender"
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Height (cm)"
              name="height_cm"
              type="number"
              value={formData.height_cm}
              onChange={handleChange}
              inputProps={{ min: 50, max: 250 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Weight (kg)"
              name="weight_kg"
              type="number"
              value={formData.weight_kg}
              onChange={handleChange}
              inputProps={{ min: 20, max: 300 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Activity Level</InputLabel>
              <Select
                name="activity_level"
                value={formData.activity_level}
                onChange={handleChange}
                label="Activity Level"
              >
                {activityLevels.map((level) => (
                  <MenuItem key={level} value={level}>
                    {level}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Dietary Preferences
            </Typography>
            <FormGroup row>
              {dietaryPreferences.map((preference) => (
                <FormControlLabel
                  key={preference}
                  control={
                    <Checkbox
                      checked={formData.dietary_preferences.includes(preference)}
                      onChange={handleCheckboxChange}
                      name="dietary_preferences"
                      value={preference}
                    />
                  }
                  label={preference}
                />
              ))}
            </FormGroup>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Allergies (comma-separated)"
              name="allergies"
              value={formData.allergies.join(', ')}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  allergies: e.target.value.split(',').map((item) => item.trim()),
                }));
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Health Conditions (comma-separated)"
              name="health_conditions"
              value={formData.health_conditions.join(', ')}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  health_conditions: e.target.value.split(',').map((item) => item.trim()),
                }));
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Weight Goal</InputLabel>
              <Select
                name="weight_goal"
                value={formData.weight_goal}
                onChange={handleChange}
                label="Weight Goal"
              >
                {weightGoals.map((goal) => (
                  <MenuItem key={goal} value={goal}>
                    {goal}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
            >
              Submit Profile
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default UserProfileQuiz; 