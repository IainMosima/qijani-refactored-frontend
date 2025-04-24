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
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  Alert,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { motion } from 'framer-motion';

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

const steps = ['Personal Info', 'Physical Stats', 'Health & Goals'];

const UserProfileQuiz = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(false);

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

  const handleSelectChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setIsLoadingRecommendations(true);

    try {
      // Here you would typically send the data to your backend
      console.log('Form submitted:', formData);
      await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate API call
      setSubmitSuccess(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
      setIsLoadingRecommendations(false);
    }
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                inputProps={{ min: 0, max: 120 }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Gender</InputLabel>
                <Select
                  name="gender"
                  value={formData.gender}
                  onChange={handleSelectChange}
                  label="Gender"
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Height (cm)"
                name="height_cm"
                type="number"
                value={formData.height_cm}
                onChange={handleChange}
                inputProps={{ min: 50, max: 250 }}
                required
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
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Activity Level</InputLabel>
                <Select
                  name="activity_level"
                  value={formData.activity_level}
                  onChange={handleSelectChange}
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
          </Grid>
        );
      case 2:
        return (
          <Grid container spacing={3}>
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
              <FormControl fullWidth required>
                <InputLabel>Weight Goal</InputLabel>
                <Select
                  name="weight_goal"
                  value={formData.weight_goal}
                  onChange={handleSelectChange}
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
          </Grid>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 2,
          background: 'white'
        }}
      >
        {!submitSuccess && (
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography 
              variant="h4" 
              gutterBottom 
              sx={{ 
                color: '#004523',
                fontWeight: 'bold',
                mb: 2
              }}
            >
              Let&apos;s Create Your Perfect Meal Plan
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: '#666',
                maxWidth: '600px',
                margin: '0 auto',
                mb: 3
              }}
            >
              By understanding your unique preferences, dietary needs, and health goals, we can craft personalized meal recommendations that are not just healthy, but also delicious and perfectly suited to your lifestyle.
            </Typography>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                color: '#004523',
                fontStyle: 'italic'
              }}
            >
              Your journey to better eating starts here
            </Typography>
          </Box>
        )}

        {!submitSuccess &&
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        }

        {submitSuccess ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <CircularProgress
                size={60}
                sx={{
                  color: '#004523',
                  mb: 3
                }}
              />

              <Typography variant="h5" gutterBottom sx={{ color: '#004523', mb: 2 }}>
                Generating Your Personalized Recommendations
              </Typography>
              <Typography variant="body1" sx={{ color: '#666' }}>
                We&apos;re analyzing your preferences to create the perfect meal plan for you...
              </Typography>
            </Box>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit}>
            {getStepContent(activeStep)}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{
                  color: '#004523',
                  backgroundColor: 'transparent',
                  '&:hover': {
                    backgroundColor: 'transparent'
                  }
                }}
              >
                Back
              </Button>
              {activeStep === steps.length - 1 ? (
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                  className="bg-green text-yellow"
                >
                  {isSubmitting ? <CircularProgress size={24} /> : 'Submit'}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  className="bg-green text-yellow"
                >
                  Next
                </Button>
              )}
            </Box>
          </form>
        )}
      </Paper>
    </motion.div>
  );
};

export default UserProfileQuiz;