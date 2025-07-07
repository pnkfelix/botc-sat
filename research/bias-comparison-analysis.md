# Seed Pattern Bias Analysis Results

## Summary: Sequential Seeds [0,99] vs Random Seeds (First 100)

### Key Findings

**🔍 Baron Appearance:**
- **Sequential seeds [0,99]**: Baron **NEVER** appeared (0/100)
- **Random seeds**: Baron **NEVER** appeared (0/100)
- **Result**: No improvement - Baron still never appears

**📊 Coefficient of Variation (Lower = Better):**
- **Sequential seeds**: 47.3% (FAIR - High variation)
- **Random seeds**: 40.4% (FAIR - High variation) 
- **Result**: 6.9% improvement with random seeds ✅

**📈 Frequency Range (Lower = Better):**
- **Sequential seeds**: 98 occurrences (98.0% of total)
- **Random seeds**: 83 occurrences (83.0% of total)
- **Result**: 15-occurrence improvement with random seeds ✅

**🎯 Standard Deviation:**
- **Sequential seeds**: 18.04
- **Random seeds**: 15.38
- **Result**: 2.66 point improvement with random seeds ✅

**⚡ Performance:**
- **Sequential seeds**: 6.8s
- **Random seeds**: 6.7s  
- **Result**: Nearly identical performance

## Detailed Role Frequency Comparison

### Most/Least Frequent Roles

**Sequential Seeds [0,99]:**
- Most frequent: imp (100/100, 100.0%)
- Least frequent: fortune_teller (2/100, 2.0%)
- Never appear: **baron**

**Random Seeds (First 100):**
- Most frequent: imp (100/100, 100.0%)
- Least frequent: drunk (17/100, 17.0%)
- Never appear: **baron**

### Notable Changes with Random Seeds:
- **fortune_teller**: Dramatically improved from 2% → 38% (+36%)
- **drunk**: Decreased from 33% → 17% (-16%)
- **spy**: Improved from 22% → 39% (+17%)
- **saint**: Improved from 19% → 25% (+6%)

## Conclusion

### ✅ **Improvements with Random Seeds:**
1. **Lower coefficient of variation** (47.3% → 40.4%)
2. **Tighter frequency range** (98 → 83 occurrences)
3. **Better standard deviation** (18.04 → 15.38)
4. **Dramatic improvement for fortune_teller** (near-zero to normal frequency)

### ❌ **No Improvement:**
1. **Baron still never appears** - The core issue remains
2. **Both assessments still "FAIR" bias** - Neither reaches "GOOD" threshold

### 💡 **Interpretation:**
Better bit-pattern variation **does help reduce bias** but **doesn't solve the fundamental Baron problem**. The 6.9% reduction in coefficient of variation and tighter frequency ranges show that random seeds provide measurably better distribution.

However, Baron's complete absence in both tests suggests this is a **constraint-level issue** rather than a seed randomness issue. Baron likely requires specific conditions (like many outsiders) that are rarely satisfied in standard 8-player setups.

### 🎯 **Recommendation:**
Use random seeds for better overall bias reduction, but investigate Baron's constraints separately to understand why it never appears in 8-player games.