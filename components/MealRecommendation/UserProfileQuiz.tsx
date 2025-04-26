"use client"
import React, { useState, useEffect } from 'react';
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
import { motion, AnimatePresence } from 'framer-motion';
import { createMealProfileRequest, getMealProfile, updateMealProfile } from '../../network/mealProfile';
import { getMealRecommendations } from '../../network/mealRecommendation';
import { RecommendedMealResponse, AIRecommendedMeal } from '../../models/mealRecommedation';
import { savedMealProfile } from '../../models/mealProfile';

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
    heightCm: '',
    weightKg: '',
    activityLevel: '',
    dietaryPreferences: [] as string[],
    allergies: [] as string[],
    healthConditions: [] as string[],
    weightGoal: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(false);
  const [recommendations, setRecommendations] = useState<RecommendedMealResponse | null>(null);
  const [pollingInterval, setPollingInterval] = useState<NodeJS.Timeout | null>(null);
  const [hasExistingRecommendations, setHasExistingRecommendations] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [existingProfile, setExistingProfile] = useState<savedMealProfile | null>(null);

  // Check for existing recommendations and profile when component mounts
  useEffect(() => {
    const checkExistingData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setIsInitialLoading(false);
          return;
        }

        const [existingRecommendations, existingProfile] = await Promise.all([
          getMealRecommendations(token),
          getMealProfile(token)
        ]);

        if (existingRecommendations && Object.keys(existingRecommendations).length > 0) {
          setRecommendations(existingRecommendations);
          setHasExistingRecommendations(true);
        }

        if (existingProfile && Object.keys(existingProfile).length > 0) {
          setExistingProfile(existingProfile);
          setFormData({
            age: existingProfile.age.toString(),
            gender: existingProfile.gender,
            heightCm: existingProfile.heightCm.toString(),
            weightKg: existingProfile.weightKg.toString(),
            activityLevel: existingProfile.activityLevel,
            dietaryPreferences: existingProfile.dietaryPrefernces,
            allergies: existingProfile.allergies,
            healthConditions: existingProfile.healthConditions,
            weightGoal: existingProfile.weightGoal,
          });
        }
      } catch (error) {
        console.error('Error checking for existing data:', error);
      } finally {
        setIsInitialLoading(false);
      }
    };

    checkExistingData();
  }, []);

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
      [name as string]: value,
    }));
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleEditProfile = () => {
    setIsEditMode(true);
    setSubmitSuccess(false);
    setActiveStep(0);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setIsLoadingRecommendations(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const mealProfileData = {
        age: parseInt(formData.age),
        gender: formData.gender,
        heightCm: parseInt(formData.heightCm),
        weightKg: parseInt(formData.weightKg),
        activityLevel: formData.activityLevel,
        dietaryPrefernces: formData.dietaryPreferences,
        allergies: formData.allergies,
        healthConditions: formData.healthConditions,
        weightGoal: formData.weightGoal,
      };

      if (isEditMode && existingProfile) {
        await updateMealProfile(existingProfile._id, mealProfileData, token);
      } else {
        await createMealProfileRequest(mealProfileData, token);
      }
      
      setSubmitSuccess(true);
      setIsEditMode(false);

      // Start polling for recommendations after 2 minutes
      setTimeout(() => {
        const interval = setInterval(async () => {
          try {
            const recommendations = await getMealRecommendations(token);
            if (recommendations && Object.keys(recommendations).length > 0) {
              setRecommendations(recommendations);
              setIsLoadingRecommendations(false);
              if (pollingInterval) {
                clearInterval(pollingInterval);
              }
            }
          } catch (error) {
            console.error('Error fetching recommendations:', error);
          }
        }, 5000); // Poll every 5 seconds

        setPollingInterval(interval);
      }, 120000); // Start polling after 2 minutes
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
      setIsLoadingRecommendations(false);
    }
  };

  // Cleanup polling interval on component unmount
  useEffect(() => {
    return () => {
      if (pollingInterval) {
        clearInterval(pollingInterval);
      }
    };
  }, [pollingInterval]);

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
                name="heightCm"
                type="number"
                value={formData.heightCm}
                onChange={handleChange}
                inputProps={{ min: 50, max: 250 }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Weight (kg)"
                name="weightKg"
                type="number"
                value={formData.weightKg}
                onChange={handleChange}
                inputProps={{ min: 20, max: 300 }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Activity Level</InputLabel>
                <Select
                  name="activityLevel"
                  value={formData.activityLevel}
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
                        checked={formData.dietaryPreferences.includes(preference)}
                        onChange={handleCheckboxChange}
                        name="dietaryPreferences"
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
                name="healthConditions"
                value={formData.healthConditions.join(', ')}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    healthConditions: e.target.value.split(',').map((item) => item.trim()),
                  }));
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Weight Goal</InputLabel>
                <Select
                  name="weightGoal"
                  value={formData.weightGoal}
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
        {isInitialLoading ? (
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            minHeight: '400px'
          }}>
            <CircularProgress sx={{ color: '#004523', mb: 3 }} />
            <Typography variant="h6" sx={{ color: '#004523', mb: 2 }}>
              Loading your meal profile...
            </Typography>
          </Box>
        ) : (hasExistingRecommendations && !isEditMode) ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" sx={{ 
                  color: '#004523', 
                  fontWeight: 'bold',
                  fontFamily: 'inherit'
                }}>
                  Your Personalized Meal Plan
                </Typography>
                <Button
                  variant="outlined"
                  onClick={handleEditProfile}
                  sx={{
                    color: '#004523',
                    borderColor: '#004523',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 69, 35, 0.04)',
                      borderColor: '#004523',
                    },
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontSize: '1rem'
                  }}
                >
                  Edit Profile
                </Button>
              </Box>
              <RecommendedMeals meals={recommendations!} />
            </Box>
          </motion.div>
        ) : (
          <>
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
                  {isEditMode ? 'Update Your Meal Profile' : 'Let\'s Create Your Perfect Meal Plan'}
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
                  {isEditMode 
                    ? 'Update your preferences, dietary needs, and health goals to get new personalized meal recommendations.'
                    : 'By understanding your unique preferences, dietary needs, and health goals, we can craft personalized meal recommendations that are not just healthy, but also delicious and perfectly suited to your lifestyle.'
                  }
                </Typography>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    color: '#004523',
                    fontStyle: 'italic'
                  }}
                >
                  {isEditMode ? 'Update your journey to better eating' : 'Your journey to better eating starts here'}
                </Typography>
              </Box>
            )}

            {!submitSuccess && (
              <Stepper 
                activeStep={activeStep} 
                sx={{ 
                  mb: 4,
                  '& .MuiStepLabel-root': {
                    padding: { xs: '8px', sm: '16px' }
                  },
                  '& .MuiStepLabel-label': {
                    fontSize: { xs: '0.7rem', sm: '0.875rem' },
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: { xs: '80px', sm: '120px' }
                  },
                  '& .MuiStepLabel-iconContainer': {
                    paddingRight: { xs: '4px', sm: '8px' }
                  },
                  '@media (max-width: 600px)': {
                    flexDirection: 'column',
                    '& .MuiStep-root': {
                      marginBottom: '8px'
                    }
                  }
                }}
              >
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            )}

            {submitSuccess ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  {isLoadingRecommendations ? (
                    <>
                      <CircularProgress sx={{ color: '#004523', mb: 3 }} />
                      <Typography variant="h6" sx={{ color: '#004523', mb: 2 }}>
                        {isEditMode ? 'Generating new recommendations based on your updated profile...' : 'Generating your personalized meal recommendations...'}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#666' }}>
                        This may take a few minutes. Please wait while we analyze your preferences.
                      </Typography>
                    </>
                  ) : recommendations ? (
                    <>
                      <Typography variant="h4" gutterBottom sx={{ 
                        color: '#004523', 
                        mb: 2,
                        fontWeight: 'bold',
                        fontFamily: 'inherit'
                      }}>
                        {isEditMode ? 'Your Updated Meal Plan is Ready!' : 'Your Personalized Meal Plan is Ready!'}
                      </Typography>
                      <RecommendedMeals meals={recommendations} />
                      <Button
                        variant="outlined"
                        onClick={() => {
                          setSubmitSuccess(false);
                          setActiveStep(0);
                          setFormData({
                            age: '',
                            gender: '',
                            heightCm: '',
                            weightKg: '',
                            activityLevel: '',
                            dietaryPreferences: [],
                            allergies: [],
                            healthConditions: [],
                            weightGoal: '',
                          });
                        }}
                        sx={{
                          color: '#004523',
                          borderColor: '#004523',
                          '&:hover': {
                            backgroundColor: 'rgba(0, 69, 35, 0.04)',
                            borderColor: '#004523',
                          },
                          mt: 4,
                          px: 4,
                          py: 1.5,
                          borderRadius: 2,
                          textTransform: 'none',
                          fontSize: '1rem'
                        }}
                      >
                        Start Over
                      </Button>
                    </>
                  ) : (
                    <>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 20
                        }}
                      >
                        <Box
                          sx={{
                            width: 100,
                            height: 100,
                            margin: '0 auto',
                            marginBottom: '20px',
                            position: 'relative',
                            backgroundColor: '#004523',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 4px 20px rgba(0, 69, 35, 0.2)'
                          }}
                        >
                          <motion.div
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{
                              duration: 1,
                              ease: "easeInOut"
                            }}
                            style={{
                              width: 50,
                              height: 50,
                            }}
                          >
                            <svg viewBox="0 0 24 24" style={{ width: '100%', height: '100%' }}>
                              <motion.path
                                d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
                                fill="none"
                                stroke="white"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </motion.div>
                        </Box>
                      </motion.div>

                      <Typography variant="h4" gutterBottom sx={{ 
                        color: '#004523', 
                        mb: 2,
                        fontWeight: 'bold',
                        fontFamily: 'inherit'
                      }}>
                        {isEditMode ? 'Profile Updated Successfully!' : 'Amazing! You\'re All Set'}
                      </Typography>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <Typography variant="body1" sx={{ 
                          color: '#666', 
                          mb: 3,
                          fontSize: '1.1rem',
                          maxWidth: '600px',
                          margin: '0 auto'
                        }}>
                          {isEditMode 
                            ? 'Your profile has been updated. We\'re now generating new recommendations based on your changes.'
                            : 'Your personalized meal journey is about to begin. Get ready to discover delicious, healthy options tailored just for you!'
                          }
                        </Typography>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                      >
                        <Button
                          variant="outlined"
                          onClick={() => {
                            setSubmitSuccess(false);
                            setActiveStep(0);
                            setFormData({
                              age: '',
                              gender: '',
                              heightCm: '',
                              weightKg: '',
                              activityLevel: '',
                              dietaryPreferences: [],
                              allergies: [],
                              healthConditions: [],
                              weightGoal: '',
                            });
                          }}
                          sx={{
                            color: '#004523',
                            borderColor: '#004523',
                            '&:hover': {
                              backgroundColor: 'rgba(0, 69, 35, 0.04)',
                              borderColor: '#004523',
                            },
                            mt: 2,
                            px: 4,
                            py: 1.5,
                            borderRadius: 2,
                            textTransform: 'none',
                            fontSize: '1rem'
                          }}
                        >
                          Start Over
                        </Button>
                      </motion.div>
                    </>
                  )}
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
                      {isSubmitting ? <CircularProgress size={24} /> : (isEditMode ? 'Update Profile' : 'Submit')}
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
          </>
        )}
      </Paper>
    </motion.div>
  );
};

interface RecommendedMealsProps {
  meals: RecommendedMealResponse;
}

const MealTypeSection = ({ mealType, meals }: { mealType: string; meals: AIRecommendedMeal[] }) => (
  <div className="app__card" style={{ marginBottom: '3rem' }}>
    <div className="card-title" style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
      <div style={{ flexBasis: '11%' }} />
      <h3 style={{
        textTransform: 'uppercase',
        fontSize: '1.35rem',
        fontWeight: 800,
        letterSpacing: 2,
        color: '#004523',
        background: 'linear-gradient(90deg, #e6f4ea 0%, #f0f7f4 100%)',
        borderRadius: 12,
        padding: '8px 32px',
        boxShadow: '0 2px 12px 0 rgba(0,69,35,0.07)',
        margin: '0 auto',
      }}>{mealType}</h3>
      <div style={{ flexBasis: '11%' }} />
    </div>
    <hr style={{ border: 'none', borderTop: '2px solid #e6f4ea', margin: '18px 0 24px 0' }} />
    <div className="card-body grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" style={{ minHeight: '500px' }}>
      {meals.slice(0, 4).map((meal, index) => (
        <div
          key={index}
          className="modern-meal-card"
          style={{
            background: 'linear-gradient(135deg, #f8fafc 0%, #e6f4ea 100%)',
            borderRadius: 20,
            boxShadow: '0 6px 32px 0 rgba(0,69,35,0.10)',
            padding: '28px 24px',
            display: 'flex',
            flexDirection: 'column',
            transition: 'transform 0.18s cubic-bezier(.4,0,.2,1), box-shadow 0.18s cubic-bezier(.4,0,.2,1)',
            cursor: 'pointer',
            border: '1.5px solid #e6f4ea',
            minHeight: '520px',
            height: '100%',
            position: 'relative',
            overflow: 'hidden',
          }}
          onMouseOver={e => {
            (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 36px 0 rgba(0,69,35,0.16)';
          }}
          onMouseOut={e => {
            (e.currentTarget as HTMLDivElement).style.boxShadow = '0 6px 32px 0 rgba(0,69,35,0.10)';
          }}
        >
          {/* Meal Name Header */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginBottom: 16,
            background: '#004523',
            margin: '-28px -24px 16px -24px',
            padding: '16px 24px',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            minHeight: 48,
            justifyContent: 'flex-start',
          }}>
            <span style={{
              color: '#fff',
              fontWeight: 800,
              fontSize: '1.15rem',
              letterSpacing: 0.5,
              flex: 1,
              lineHeight: 1.2,
              wordBreak: 'break-word',
              maxHeight: '2.6em',
              display: 'block',
              overflow: 'hidden',
            }}>{meal.meal_name}</span>
          </div>

          {/* Time and Portion Info */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
            <span style={{ 
              color: '#004523', 
              background: '#e6f4ea', 
              fontWeight: 600, 
              fontSize: '0.88rem', 
              borderRadius: 8, 
              padding: '4px 12px', 
              boxShadow: '0 1px 4px 0 rgba(0,69,35,0.08)',
              lineHeight: 1.3,
              wordBreak: 'break-word',
              maxWidth: '100%',
              display: 'inline-block',
            }}>
              {meal.prep_time_minutes} minutes
            </span>
            <span style={{ 
              color: '#004523', 
              background: '#e6f4ea', 
              fontWeight: 600, 
              fontSize: '0.88rem', 
              borderRadius: 8, 
              padding: '4px 12px', 
              boxShadow: '0 1px 4px 0 rgba(0,69,35,0.08)',
              lineHeight: 1.3,
              wordBreak: 'break-word',
              maxWidth: '100%',
              display: 'inline-block',
            }}>
              {meal.portion}
            </span>
          </div>

          <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Ingredients Section */}
            <div style={{ flex: 1 }}>
              <div style={{ 
                background: '#fff', 
                borderRadius: 12, 
                padding: '12px 16px', 
                boxShadow: '0 2px 8px rgba(0,69,35,0.06)'
              }}>
                <span style={{ 
                  color: '#004523', 
                  fontWeight: 700, 
                  fontSize: '0.95rem', 
                  display: 'block',
                  marginBottom: 8,
                  borderBottom: '1px solid #e6f4ea',
                  paddingBottom: 4
                }}>Ingredients</span>
                <ul style={{ 
                  margin: 0, 
                  paddingLeft: '1.1rem', 
                  color: '#444', 
                  fontSize: '0.88rem',
                  maxHeight: '120px',
                  overflow: 'auto',
                  paddingRight: 8,
                }}>
                  {meal.ingredients.map((ingredient, i) => (
                    <li key={i} style={{ marginBottom: 4 }}>{ingredient}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Preparation Section */}
            <div style={{ flex: 1.5 }}>
              <div style={{ 
                background: '#fff', 
                borderRadius: 12, 
                padding: '12px 16px', 
                boxShadow: '0 2px 8px rgba(0,69,35,0.06)'
              }}>
                <span style={{ 
                  color: '#004523', 
                  fontWeight: 700, 
                  fontSize: '0.95rem', 
                  display: 'block',
                  marginBottom: 8,
                  borderBottom: '1px solid #e6f4ea',
                  paddingBottom: 4
                }}>Preparation</span>
                <ol style={{ 
                  margin: 0, 
                  paddingLeft: '1.1rem', 
                  color: '#444', 
                  fontSize: '0.88rem',
                  maxHeight: '180px',
                  overflow: 'auto',
                  paddingRight: 8,
                }}>
                  {meal.preparation_steps.map((step, i) => (
                    <li key={i} style={{ marginBottom: 4 }}>{step}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          {/* Goal Support Footer */}
          <div style={{ marginTop: 16, textAlign: 'right' }}>
            <span style={{
              color: '#fff',
              background: 'linear-gradient(90deg, #004523 60%, #1b6b3a 100%)',
              fontStyle: 'italic',
              fontWeight: 600,
              fontSize: '0.82rem',
              borderRadius: 16,
              padding: '2px 6px',
              textAlign: 'left',
              boxShadow: '0 1px 6px 0 rgba(0,69,35,0.10)',
              display: 'inline-block',
              letterSpacing: 0.2,
              maxWidth: '100%',
              wordBreak: 'break-word',
              maxHeight: '3.6em',
              overflow: 'hidden',
              lineHeight: 1.2,
            }}>
              <span style={{ fontWeight: 700, fontSize: '0.82em', textTransform: 'uppercase', letterSpacing: 1, marginRight: 6, opacity: 0.85 }}>Goal</span>
              <span style={{ fontWeight: 500 }}>{meal.goal_support}</span>
            </span>
          </div>
        </div>
      ))}
    </div>
    <br />
    <hr style={{ border: 'none', borderTop: '2px solid #e6f4ea', margin: '18px 0 0 0' }} />
  </div>
);

const RecommendedMeals: React.FC<RecommendedMealsProps> = ({ meals }) => {
  const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snack"];
  const groupedMeals: { [key: string]: AIRecommendedMeal[] } = {};
  mealTypes.forEach(type => {
    groupedMeals[type] = meals.recommendedMeals.filter(
      (meal: AIRecommendedMeal) => meal.meal_type.toLowerCase() === type.toLowerCase()
    );
  });

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" sx={{ color: '#004523', mb: 3, fontWeight: 'bold' }}>
        Your Personalized Meal Plan
      </Typography>
      {mealTypes.map((type) =>
        groupedMeals[type] && groupedMeals[type].length > 0 ? (
          <MealTypeSection key={type} mealType={type} meals={groupedMeals[type]} />
        ) : null
      )}
    </Box>
  );
};

export default UserProfileQuiz;